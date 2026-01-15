import { useState, useMemo , useEffect } from 'react';
import api from '../api/instance';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Search, X, Save, Filter, ChevronDown, Calendar, DollarSign , EyeIcon } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({ title: '', duration: '', price: '', category: 'Visit', description: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });
    const [selectedDetails, setSelectedDetails] = useState(null);


    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            setServices(res.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // Extract unique categories
    const categories = ["Visit", "Consultation", "Session"];

    // Filter and sort services
    const filteredServices = useMemo(() => {
        let result = [...services];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(service =>
                service.title.toLowerCase().includes(term) ||
                service.duration.toLowerCase().includes(term) ||
                service.price.toLowerCase().includes(term) ||
                service.category.toLowerCase().includes(term)
            );
        }

        // Apply category filter
        if (filterCategory !== 'all') {
            result = result.filter(service => service.category === filterCategory);
        }

        // Apply sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // Handle string comparison
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    if (sortConfig.direction === 'ascending') {
                        return aValue.localeCompare(bValue);
                    } else {
                        return bValue.localeCompare(aValue);
                    }
                }

                // Handle number comparison (extract numbers from strings)
                const aNum = parseFloat(aValue.replace(/[^0-9.-]+/g, ''));
                const bNum = parseFloat(bValue.replace(/[^0-9.-]+/g, ''));
                
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    if (sortConfig.direction === 'ascending') {
                        return aNum - bNum;
                    } else {
                        return bNum - aNum;
                    }
                }

                return 0;
            });
        }

        return result;
    }, [services, searchTerm, filterCategory, sortConfig]);

    // Handle sorting
    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Open modal for adding new service
    const handleAddNew = () => {
        setEditingService(null);
        setFormData({ title: '', duration: '', price: '', category: 'Visit', description: '' });
        setShowModal(true);
    };

    // Open modal for editing service
    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({ 
            title: service.title, 
            duration: service.duration, 
            price: service.price, 
            category: service.category || 'Visit', 
            description: service.description || ''
        });
        setShowModal(true);
    };

    // Save service (create or update)
    const handleSave = async () => {
        if (!formData.title.trim() || !formData.duration.trim() || formData.price === 0 || !formData.description.trim()) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            if (editingService) {
                const res = await api.put(`/services/${editingService._id}`, formData);
                // Update service in state
                setServices(services.map(service => 
                    service._id === editingService._id ? res.data.service : service
                ));
            } else {
                const res = await api.post('/services', formData);
                // Add new service
                setServices([...services, res.data.service]);
            }

            setShowModal(false);
            setFormData({ title: '', duration: '', price: '', category: 'Visit' , description: '' });
        } catch (error) {
            console.log('Error saving service:', error);
            toast.error('An error occurred while saving the service.');
        }
    };

    // Handle delete confirmation
    const handleDeleteClick = (service) => {
        setServiceToDelete(service);
        setShowDeleteConfirm(true);
    };

    // Confirm delete
    const confirmDelete = async () => {
        try{
            await api.delete(`/services/${serviceToDelete._id}`);
            setServices(services.filter(service => service._id !== serviceToDelete._id));
            setShowDeleteConfirm(false);
            setServiceToDelete(null);
        }catch(err){
            toast.error('An error occurred while deleting the service.');
        }
    };

    // Reset form
    const handleCancel = () => {
        setShowModal(false);
        setFormData({ title: '', duration: '', price: '', category: 'Visit', description: '' });
        setEditingService(null);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setFilterCategory('all');
        setSortConfig({ key: 'title', direction: 'ascending' });
    };

    // Render sort indicator
    const renderSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return (
            <ChevronDown 
                size={16} 
                className={`transition-transform ${
                    sortConfig.direction === 'ascending' ? 'rotate-0' : 'rotate-180'
                }`}
            />
        );
    };

    const generateColorFromCategory = (category) => {
        // Create a simple hash from string
        let hash = 0;
        for (let i = 0; i < category.length; i++) {
            const char = category.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        // Convert hash to positive number and create hex color
        const positiveHash = Math.abs(hash);
        const hex = (positiveHash % 0xFFFFFF).toString(16).padStart(6, '0');
        return `#${hex}`;
    };

    return (
        <div className="min-h-[50vh] bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Services Management</h1>
                            <p className="text-sm text-gray-500 mt-2">Manage and organize your service offerings</p>
                        </div>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-lg transition-colors font-medium shadow-sm hover:shadow-md"
                        >
                            <Plus size={20} />
                            Add New Service
                        </button>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search services by title, category, duration, or price..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter size={20} className="text-gray-400" />
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category === 'all' ? 'All Categories' : category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Filter Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-800">{filteredServices.length}</span> of{' '}
                            <span className="font-semibold text-gray-800">{services.length}</span> services
                            {(searchTerm || filterCategory !== 'all') && (
                                <span className="ml-2">
                                    ({searchTerm && `search: "${searchTerm}"`}
                                    {searchTerm && filterCategory !== 'all' && ', '}
                                    {filterCategory !== 'all' && `category: ${filterCategory}`})
                                </span>
                            )}
                        </div>
                        {(searchTerm || filterCategory !== 'all') && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <X size={16} />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Services Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full">
                            <thead className="sticky top-0 z-10 bg-gray-50">
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('title')}>
                                        <div className="flex items-center gap-2">
                                            <span>Service Name</span>
                                            {renderSortIndicator('title')}
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('category')}>
                                        <div className="flex items-center gap-2">
                                            <span>Category</span>
                                            {renderSortIndicator('category')}
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('duration')}>
                                        <div className="flex items-center gap-2">
                                            <span>Duration</span>
                                            {renderSortIndicator('duration')}
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('price')}>
                                        <div className="flex items-center gap-2">
                                            <span>Price</span>
                                            {renderSortIndicator('price')}
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 overflow-y-auto">
                                {filteredServices.length > 0 ? (
                                    filteredServices.map((service) => (
                                        <tr key={service._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-800">{service.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className='inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium '
                                                    style={{ backgroundColor: generateColorFromCategory(service.category) + '20', color: generateColorFromCategory(service.category) }}>
                                                    {service.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    <span className="text-sm text-gray-700">{service.duration}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign size={14} className="text-gray-400" />
                                                    <span className="text-sm font-semibold text-gray-800">{service.price}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedDetails(service);}}
                                                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-slate-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <EyeIcon size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit Service"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(service)}
                                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Service"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-12 px-6 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search size={48} className="text-gray-300 mb-4" />
                                                <div className="text-gray-500 text-sm mb-2">No services found</div>
                                                <div className="text-gray-400 text-xs">
                                                    {searchTerm ? 'Try a different search term' : 'Add your first service to get started'}
                                                </div>
                                                {searchTerm && (
                                                    <button
                                                        onClick={clearFilters}
                                                        className="mt-4 text-sm text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Clear Search
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 max-w-full overflow-x-auto">
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-800">{services.length}</span> total services
                                {filteredServices.length !== services.length && (
                                    <span className="ml-2">
                                        (<span className="font-semibold text-gray-800">{filteredServices.length}</span> filtered)
                                    </span>
                                )}
                            </div>
                        {categories.filter(cat => cat !== 'all').map(category => (
                            <div key={category} className="flex items-center gap-2 text-xs text-gray-500">
                                <div 
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: generateColorFromCategory(category) }}
                                ></div>
                                <span>{category}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {editingService ? 'Edit Service' : 'Add New Service'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {editingService ? 'Update service details' : 'Create a new service offering'}
                                    </p>
                                </div>
                                <button
                                    onClick={handleCancel}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Ask for nursing consultation"
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white"
                                    >
                                        <option value="Consultation">Consultation</option>
                                        <option value="Visit">Visit</option>
                                        <option value="Session">Session</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration *
                                    </label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 4-6 weeks or Ongoing"
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="e.g., $2,500 or $800/month"
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        placeholder="Provide a brief description of the service..."
                                        className="w-full h-24 px-4 py-3 text-sm border-t border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none overflow-y-auto"
                                    ></textarea>
                                </div>
                            </div>


                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                                <button
                                    onClick={handleCancel}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm hover:shadow-md"
                                >
                                    <Save size={16} />
                                    {editingService ? 'Update Service' : 'Create Service'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && serviceToDelete && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-red-100 rounded-xl">
                                        <Trash2 className="text-red-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Delete Service</h3>
                                        <p className="text-sm text-gray-600">This action cannot be undone</p>
                                    </div>
                                </div>

                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-gray-800 font-medium mb-2">
                                        Delete "{serviceToDelete.title}"?
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                                        <div>
                                            <span className="font-medium">Category:</span> {serviceToDelete.category}
                                        </div>
                                        <div>
                                            <span className="font-medium">Duration:</span> {serviceToDelete.duration}
                                        </div>
                                        <div>
                                            <span className="font-medium">Price:</span> {serviceToDelete.price}
                                        </div>
                                        <div>
                                            <span className="font-medium">ID:</span> #{serviceToDelete._id}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
                                    >
                                        Delete Service
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedDetails && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Service Details</h3>
                                    <p className="text-sm text-gray-500 mt-1">Complete information about this service</p>
                                </div>
                                <button
                                    onClick={() => setSelectedDetails(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Service Header */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-semibold text-gray-800">{selectedDetails.title}</h4>
                                        <span 
                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                                            style={{ 
                                                backgroundColor: generateColorFromCategory(selectedDetails.category) + '20', 
                                                color: generateColorFromCategory(selectedDetails.category) 
                                            }}
                                        >
                                            {selectedDetails.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{selectedDetails.description}</p>
                                </div>

                                {/* Service Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar size={18} className="text-blue-600" />
                                            <span className="font-semibold text-gray-800">Duration</span>
                                        </div>
                                        <p className="text-gray-700">{selectedDetails.duration}</p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <DollarSign size={18} className="text-green-600" />
                                            <span className="font-semibold text-gray-800">Price</span>
                                        </div>
                                        <p className="text-gray-700 font-semibold">{selectedDetails.price}</p>
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service ID</label>
                                        <div className="bg-gray-100 rounded-lg p-3">
                                            <code className="text-sm text-gray-800">{selectedDetails._id}</code>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <p className="text-gray-700 leading-relaxed">
                                                {selectedDetails.description || 'No detailed description available.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                                <button
                                    onClick={() => {
                                        setSelectedDetails(null);
                                        handleEdit(selectedDetails);
                                    }}
                                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
                                >
                                    <Edit2 size={16} />
                                    Edit Service
                                </button>
                                <button
                                    onClick={() => setSelectedDetails(null)}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;