import { useState, useEffect, useMemo } from 'react';
import api from '../api/instance';

const Inbox = () => {
    const [requests, setRequests] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRequests, setFilteredRequests] = useState(requests);
    const [selectedRequest, setSelectedRequest] = useState(null);
    
    const fetchRequests = async () => {
        try {
            const res = await api.get('/appointements');
            setRequests(res.data);
        } catch(err) {
            console.error('Error fetching requests:', err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Filter and search functionality
    useEffect(() => {
        let result = [...requests];
        
        // Apply status filter
        if (filterStatus !== 'all') {
            result = result.filter(request => 
                request.status === filterStatus
            );
        }
        
        // Apply search query
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            result = result.filter(request => 
                request.user?.username?.toLowerCase().includes(query) ||
                request.service?.title?.toLowerCase().includes(query)
            );
        }
        
        setFilteredRequests(result);
    }, [requests, filterStatus, searchQuery]);

    // Stats calculation
    const stats = useMemo(() => ({
        total: requests.length,
        pending: requests.filter(r => r.status === 'Pending').length,
        approved: requests.filter(r => r.status === 'Confirmed').length,
        declined: requests.filter(r => r.status === 'Cancelled').length
    }), [requests]);

    const handleApprove = async (_id) => {
        try{
            await api.put(`/appointements/approve/${_id}`);
            setRequests(requests.map(req =>
                req._id === _id ? { ...req, status: 'Confirmed' } : req
            ));
        }catch(err){
            console.error('Error approving request:', err);
        }
    };

    const handleDecline = async (_id) => {
        try{
            await api.put(`/appointements/reject/${_id}`);
            setRequests(requests.map(req =>
                req._id === _id ? { ...req, status: 'Cancelled' } : req
            ));
        }catch(err){
            console.error('Error declining request:', err);
        }
    };

    const handleViewDetails = (_id) => {
        const request = requests.find(req => req._id === _id);
        setSelectedRequest(request);
    };

    const closeModal = () => {
        setSelectedRequest(null);
    };

    const handleResetStatus = async (_id) => {
        try{
            await api.put(`/appointements/reset/${_id}`);
            setRequests(requests.map(req =>
                req._id === _id ? { ...req, status: 'Pending' } : req
            ));
        }catch(err){
            console.error('Error resetting request status:', err);
        }
    };

    const handleExportCSV = () => {
        const headers = ['ID', 'Username', 'Service Name', 'Date', 'Status'];
        const csvContent = [
            headers.join(','),
            ...filteredRequests.map(req => 
                [
                    req._id, 
                    req.user?.username || '', 
                    req.service?.title || '', 
                    req.dateTime ? new Date(req.dateTime).toLocaleDateString() : '', 
                    req.status
                ].join(',')
            )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `service-requests-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleClearFilters = () => {
        setFilterStatus('all');
        setSearchQuery('');
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Admin Header */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Services Request Inbox</h2>
                        <span className="text-xs bg-slate-800 text-white px-3 py-1 rounded-full">
                            {stats.pending} Pending
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Review and manage client service requests</p>
                </div>

                {/* Admin Controls */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-gray-600 whitespace-nowrap">Filter:</span>
                                <select 
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="text-xs border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Requests</option>
                                    <option value="Pending">Pending Only</option>
                                    <option value="Confirmed">Approved</option>
                                    <option value="Cancelled">Declined</option>
                                </select>
                            </div>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search by client or service..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="text-xs border border-gray-300 rounded pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            {(filterStatus !== 'all' || searchQuery) && (
                                <button 
                                    onClick={handleClearFilters}
                                    className="text-xs text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={handleExportCSV}
                                className="text-xs text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Export CSV</span>
                            </button>
                        </div>
                    </div>
                    {searchQuery && (
                        <div className="mt-3 text-xs text-gray-600">
                            Found {filteredRequests.length} result{filteredRequests.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden max-h-96">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 z-10">
                        <div className="col-span-4">Client / Service</div>
                        <div className="col-span-2">Date & Time</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3 text-right">Actions</div>
                    </div>

                    {/* Requests List */}
                    <div className="divide-y divide-gray-100 overflow-y-auto" style={{maxHeight: 'calc(24rem - 4rem)'}}>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((request) => (
                                <div key={request._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* Client/Service Info */}
                                        <div className="col-span-4">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-sm font-medium text-gray-800">
                                                    {request.user?.username || 'Unknown User'}
                                                </span>
                                                <span className="text-xs text-blue-600 font-medium">
                                                    {request.service?.title || 'Unknown Service'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="col-span-2">
                                            <span className="text-xs text-gray-600">
                                                {formatDate(request.dateTime)}
                                            </span>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-3">
                                            {request.status === 'Pending' ? (
                                                <span className="inline-flex items-center">
                                                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
                                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                                                        Awaiting Review
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className={`inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full ${
                                                    request.status === 'Confirmed' 
                                                        ? 'bg-green-50 text-green-700' 
                                                        : 'bg-red-50 text-red-700'
                                                }`}>
                                                    {request.status === 'Confirmed' ? (
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    ) : (
                                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                    )}
                                                    {request.status === 'Confirmed' ? 'Approved' : 'Declined'}
                                                </span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-3">
                                            <div className="flex justify-end items-center space-x-2">
                                                <button
                                                    onClick={() => handleViewDetails(request._id)}
                                                    className="text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded transition-colors border border-gray-300"
                                                >
                                                    View Details
                                                </button>

                                                {request.status === 'Pending' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(request._id)}
                                                            className="text-xs bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded transition-colors font-medium"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleDecline(request._id)}
                                                            className="text-xs bg-stone-200 hover:bg-stone-300 text-gray-800 px-3 py-1.5 rounded transition-colors font-medium"
                                                        >
                                                            Decline
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleResetStatus(request._id)}
                                                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition-colors border border-gray-300"
                                                    >
                                                        Reset to Pending
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center">
                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500 text-sm">
                                    {searchQuery ? 'No requests found matching your search.' : 'No requests available.'}
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Admin Footer Stats */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-600">
                    <div className="text-sm">
                        Showing <span className="font-medium">{filteredRequests.length}</span> of <span className="font-medium">{stats.total}</span> requests
                    </div>
                    <div className="flex flex-wrap gap-4 md:gap-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span>Pending: <span className="font-medium">{stats.pending}</span></span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Approved: <span className="font-medium">{stats.approved}</span></span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Declined: <span className="font-medium">{stats.declined}</span></span>
                        </div>
                    </div>
                </div>
            </div>
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop with better interaction */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={closeModal}
                        aria-hidden="true"
                    />

                    {/* Modal Container */}
                    <div className="relative w-full max-w-2xl transform transition-all duration-200 ease-out">
                        <div className="bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 truncate">
                                        Request Details
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        Service request information
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="ml-4 shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="overflow-y-auto max-h-[calc(90vh-73px)]">
                                <div className="p-6 space-y-6">
                                    {/* Grid Layout */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Client Information */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                                    Client Information
                                                </h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                                            Username
                                                        </label>
                                                        <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {selectedRequest.user?.username || 'Unknown User'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                                            Request Date & Time
                                                        </label>
                                                        <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {formatDate(selectedRequest.dateTime)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Service Information */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                                    Service Information
                                                </h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                                            Service Name
                                                        </label>
                                                        <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {selectedRequest.service?.title || 'Unknown Service'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                                            Current Status
                                                        </label>
                                                        <div className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                                selectedRequest.status === 'Pending'
                                                                    ? 'bg-amber-100 text-amber-800'
                                                                    : selectedRequest.status === 'Confirmed'
                                                                        ? 'bg-emerald-100 text-emerald-800'
                                                                        : 'bg-rose-100 text-rose-800'
                                                                }`}>
                                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                                    selectedRequest.status === 'Pending'
                                                                        ? 'bg-amber-500'
                                                                        : selectedRequest.status === 'Confirmed'
                                                                            ? 'bg-emerald-500'
                                                                            : 'bg-rose-500'
                                                                    }`} />
                                                                {selectedRequest.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Request Description */}
                                    <div className="border-t border-gray-200 pt-6">
                                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                            Request Description
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                {selectedRequest.requestDescription || 'No description provided.'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {selectedRequest.status === 'Pending' && (
                                        <div className="border-t border-gray-200 pt-6">
                                            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                                                <button
                                                    onClick={() => {
                                                        handleDecline(selectedRequest._id);
                                                        closeModal();
                                                    }}
                                                    className="mt-3 sm:mt-0 inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-all duration-150 hover:shadow-sm focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
                                                >
                                                    Decline Request
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleApprove(selectedRequest._id);
                                                        closeModal();
                                                    }}
                                                    className="inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 border border-transparent rounded-lg transition-all duration-150 hover:shadow-sm focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                                                >
                                                    Approve Request
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inbox;