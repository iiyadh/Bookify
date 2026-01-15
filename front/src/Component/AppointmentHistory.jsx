import { useState , useEffect } from 'react';
import api from '../api/instance';

const AppointmentHistory = () => {
    const [expandedAppointment, setExpandedAppointment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    // Existing appointment data
    const [appointmentHistory,setAppointmentHistory] = useState([]);

    const fetchAppointmentHistory = async () => {
        try{
            const response = await api.get('/appointements/user');
            setAppointmentHistory(response.data);
        }catch(err){
            console.error('Error fetching appointment history:', err);
        }
    };

    useEffect(() => {
        fetchAppointmentHistory();
    }, []);

    // Format date and time from ISO string
    const formatAppointmentDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        return { date: formattedDate, time: formattedTime };
    };

    const filteredAppointments = appointmentHistory.filter(appointment => {
        const matchesSearch = searchTerm === '' || 
            appointment.service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.requestDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.status.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDate = dateFilter === '' || appointment.dateTime.startsWith(dateFilter);
        
        return matchesSearch && matchesDate;
    });

    const toggleDetails = (appointmentId) => {
        setExpandedAppointment(
            expandedAppointment === appointmentId ? null : appointmentId
        );
    };

    const handleCancelAppointment = async (appointmentId) => {
        try{
            const response = await api.put(`/appointements/cancel/${appointmentId}`);
            setAppointmentHistory(prevHistory =>
                prevHistory.map(appointment =>
                    appointment._id === appointmentId
                        ? { ...appointment, status: 'Cancelled' }
                        : appointment
                )
            );
        }catch(err){
            console.error('Error cancelling appointment:', err);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'text-green-600';
            case 'Cancelled':
                return 'text-red-600';
            case 'Pending':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    const clearFilters = () => {
        setSearchTerm('');
        setDateFilter('');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Appointment History</h2>
            
            {/* Search and Filter Section */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by service, description, or status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div className="flex-1">
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
                
                <p className="text-sm text-gray-600">
                    Showing {filteredAppointments.length} of {appointmentHistory.length} appointments
                </p>
            </div>
            
            <div className="max-h-150 space-y-4 overflow-y-auto">
                {filteredAppointments.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No appointments found matching your filters.</p>
                    </div>
                ) : (
                    filteredAppointments.map((appointment) => {
                        const { date, time } = formatAppointmentDateTime(appointment.dateTime);
                        
                        return (
                            <div
                                key={appointment._id}
                                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Minimal View */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                                        <div className="text-center md:text-left">
                                            <p className="font-medium">{date}</p>
                                            <p className="text-sm text-gray-500">{time}</p>
                                        </div>
                                        <div>
                                            <p className="font-medium">{appointment.service.title || " "}</p>
                                            <p className={`font-medium ${getStatusColor(appointment.status)}`}>
                                                {appointment.status}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleDetails(appointment._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            {expandedAppointment === appointment._id ? 'Hide Details' : 'Show Details'}
                                        </button>

                                        {appointment.status === 'Pending' && (
                                            <button
                                                onClick={() => handleCancelAppointment(appointment._id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Cancel Appointment
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Detailed View */}
                                {expandedAppointment === appointment._id && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <h3 className="font-semibold mb-2">Service Name</h3>
                                                <p className="text-gray-700">{appointment.service.title}</p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Request Description</h3>
                                                <p className="text-gray-700">{appointment.requestDescription}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h3 className="font-semibold mb-2">Date & Time</h3>
                                                    <p className="text-gray-700">{date} at {time}</p>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-2">Status</h3>
                                                    <p className={`font-medium ${getStatusColor(appointment.status)}`}>
                                                        {appointment.status}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AppointmentHistory;