import { Activity, BarChart } from "lucide-react";
import { useState , useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../api/instance";

const MakeAppoitement = () => {
    const [formData, setFormData] = useState({
        serviceId: '',
        requestDescription: '',
        dateTime: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    }


    const handleSendRequest = async (e) => {
        e.preventDefault();
        try{
            await api.post('/appointements', formData);
            toast.success('Service request submitted successfully!');
            setFormData({
                serviceId: '',
                requestDescription: '',
                dateTime: ''
            });
        }catch(err){
            console.error('Error submitting request:', err);
            toast.error('Failed to submit request. Please try again.');
        }
    };

    const [availableServices, setAvailableServices] = useState([]);


    const fetchServices = async () => {
        try {
            const response = await api.get('/services');
            setAvailableServices(response.data);
        } catch (err) {
            console.error('Error fetching services:', err);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8" >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-slate-800 px-8 py-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Activity className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Service Request</h2>
                            <p className="text-blue-100 mt-1">Submit a new service request</p>
                        </div>
                    </div>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSendRequest}>
                    {/* Service Name Select */}
                    <div>
                        <label htmlFor="serviceId" className="block text-sm font-semibold text-gray-700 mb-2">
                            Service Name
                        </label>
                        <select
                            id="serviceId"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-3 focus:ring-slate-400 focus:border-slate-500 transition-all duration-200"
                            defaultValue=""
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select a service</option>
                            {availableServices.map((service) => (
                                <option key={service._id} value={service._id}>
                                    {service.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date and Time Field */}
                    <div>
                        <label htmlFor="dateTime" className="block text-sm font-semibold text-gray-700 mb-2">
                            Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            id="dateTime"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-3 focus:ring-slate-400 focus:border-slate-500 transition-all duration-200"
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Request Description Textarea */}
                    <div>
                        <label htmlFor="requestDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                            Request Description
                        </label>
                        <textarea
                            id="requestDescription"
                            rows={6}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-3 focus:ring-slate-400 focus:border-slate-500 transition-all duration-200 resize-none"
                            placeholder="Please describe your request in detail..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-slate-900 to-slate-800 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-slate-800 hover:to-slate-700 hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-slate-400 focus:ring-offset-2 active:scale-[0.98]"
                        >
                            <BarChart className="mr-3 h-5 w-5" />
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MakeAppoitement;