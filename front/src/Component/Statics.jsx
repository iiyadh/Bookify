import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from 'chart.js';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

const Statics = () => {
  // Fake data based on the models
  const generateFakeData = () => {
    // Appointment statuses from model: 'Pending', 'Confirmed', 'Cancelled'
    const appointmentsByStatus = {
      Pending: 45,
      Confirmed: 120,
      Cancelled: 25
    };

    // Service categories from model: 'Visit', 'Consultation', 'Session'
    const appointmentsByServiceCategory = {
      Visit: 80,
      Consultation: 65,
      Session: 45
    };

    // User statuses from model: 'active', 'inactive'
    const usersByStatus = {
      active: 156,
      inactive: 24
    };

    // Daily appointments trend (last 30 days)
    const dailyAppointmentsTrend = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toLocaleDateString(),
        appointments: Math.floor(Math.random() * 15) + 3
      };
    });

    // Revenue by service (fake services based on categories)
    const revenueByService = [
      { name: 'Health Consultation', revenue: 15800, category: 'Consultation' },
      { name: 'Home Visit', revenue: 24500, category: 'Visit' },
      { name: 'Therapy Session', revenue: 18200, category: 'Session' },
      { name: 'Medical Checkup', revenue: 32100, category: 'Visit' },
      { name: 'Online Consultation', revenue: 12600, category: 'Consultation' }
    ];

    // Monthly user growth (last 12 months)
    const monthlyUserGrowth = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      return {
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        users: Math.floor(Math.random() * 25) + 10
      };
    });

    // Top booked services
    const topBookedServices = [
      { name: 'Health Consultation', bookings: 85 },
      { name: 'Home Visit', bookings: 72 },
      { name: 'Therapy Session', bookings: 58 },
      { name: 'Medical Checkup', bookings: 45 },
      { name: 'Online Consultation', bookings: 38 }
    ];

    // Peak booking hours
    const peakBookingHours = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour}:00`,
      bookings: Math.floor(Math.random() * 20) + (hour >= 8 && hour <= 18 ? 10 : 2)
    }));

    // Revenue trend over time (last 12 months)
    const revenueTrend = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        revenue: Math.floor(Math.random() * 15000) + 5000
      };
    });

    return {
      appointmentsByStatus,
      appointmentsByServiceCategory,
      usersByStatus,
      dailyAppointmentsTrend,
      revenueByService,
      monthlyUserGrowth,
      topBookedServices,
      peakBookingHours,
      revenueTrend,
      cancellationRate: 13.2,
      averageAppointmentsPerUser: 2.8,
      totalRevenue: 103200,
      totalUsers: 180,
      totalAppointments: 190
    };
  };

  const data = generateFakeData();

  // Chart configurations
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // 1. Appointments by Status
  const appointmentsByStatusChart = {
    labels: Object.keys(data.appointmentsByStatus),
    datasets: [
      {
        data: Object.values(data.appointmentsByStatus),
        backgroundColor: ['#FFA500', '#22C55E', '#EF4444'],
        borderWidth: 2,
      },
    ],
  };

  // 2. Daily Appointments Trend
  const dailyTrendChart = {
    labels: data.dailyAppointmentsTrend.slice(-14).map(d => d.date.split('/').slice(0, 2).join('/')),
    datasets: [
      {
        label: 'Daily Appointments',
        data: data.dailyAppointmentsTrend.slice(-14).map(d => d.appointments),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // 3. Appointments by Service Category
  const serviceCategoryChart = {
    labels: Object.keys(data.appointmentsByServiceCategory),
    datasets: [
      {
        data: Object.values(data.appointmentsByServiceCategory),
        backgroundColor: ['#8B5CF6', '#EC4899', '#10B981'],
      },
    ],
  };

  // 4. Revenue by Service
  const revenueByServiceChart = {
    labels: data.revenueByService.map(s => s.name),
    datasets: [
      {
        label: 'Revenue ($)',
        data: data.revenueByService.map(s => s.revenue),
        backgroundColor: '#06B6D4',
      },
    ],
  };

  // 5. Monthly User Growth
  const userGrowthChart = {
    labels: data.monthlyUserGrowth.map(m => m.month),
    datasets: [
      {
        label: 'New Users',
        data: data.monthlyUserGrowth.map(m => m.users),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // 6. Active vs Inactive Users
  const userStatusChart = {
    labels: Object.keys(data.usersByStatus),
    datasets: [
      {
        data: Object.values(data.usersByStatus),
        backgroundColor: ['#22C55E', '#6B7280'],
      },
    ],
  };

  // 7. Top Booked Services
  const topServicesChart = {
    labels: data.topBookedServices.map(s => s.name),
    datasets: [
      {
        label: 'Bookings',
        data: data.topBookedServices.map(s => s.bookings),
        backgroundColor: '#8B5CF6',
      },
    ],
  };

  // 8. Peak Booking Hours
  const peakHoursChart = {
    labels: data.peakBookingHours.map(h => h.hour),
    datasets: [
      {
        label: 'Bookings',
        data: data.peakBookingHours.map(h => h.bookings),
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // 9. Revenue Trend
  const revenueTrendChart = {
    labels: data.revenueTrend.map(r => r.month),
    datasets: [
      {
        label: 'Revenue ($)',
        data: data.revenueTrend.map(r => r.revenue),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistics Dashboard</h1>
        <p className="text-gray-600">Overview of appointments, services, and user analytics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Appointments</h3>
          <p className="text-3xl font-bold text-blue-600">{data.totalAppointments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{data.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">${data.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Cancellation Rate</h3>
          <p className="text-3xl font-bold text-red-600">{data.cancellationRate}%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Appointments by Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Appointments by Status</h2>
          <div className="h-64">
            <Doughnut data={appointmentsByStatusChart} options={chartOptions} />
          </div>
        </div>

        {/* 2. Daily Appointments Trend */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Appointments Trend (Last 2 Weeks)</h2>
          <div className="h-64">
            <Line data={dailyTrendChart} options={chartOptions} />
          </div>
        </div>

        {/* 3. Appointments by Service Category */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Appointments by Service Category</h2>
          <div className="h-64">
            <Pie data={serviceCategoryChart} options={chartOptions} />
          </div>
        </div>

        {/* 4. Revenue by Service */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue by Service</h2>
          <div className="h-64">
            <Bar data={revenueByServiceChart} options={chartOptions} />
          </div>
        </div>

        {/* 5. Monthly User Growth */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly User Growth</h2>
          <div className="h-64">
            <Line data={userGrowthChart} options={chartOptions} />
          </div>
        </div>

        {/* 6. Active vs Inactive Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Active vs Inactive Users</h2>
          <div className="h-64">
            <Doughnut data={userStatusChart} options={chartOptions} />
          </div>
        </div>

        {/* 7. Top Booked Services */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Booked Services</h2>
          <div className="h-64">
            <Bar 
              data={topServicesChart} 
              options={{
                ...chartOptions,
                indexAxis: 'y',
              }} 
            />
          </div>
        </div>

        {/* 8. Peak Booking Hours */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Peak Booking Hours</h2>
          <div className="h-64">
            <Line data={peakHoursChart} options={chartOptions} />
          </div>
        </div>

        {/* 9. Revenue Trend Over Time */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Revenue Trend Over Time</h2>
          <div className="h-64">
            <Line data={revenueTrendChart} options={chartOptions} />
          </div>
        </div>

        {/* 10. Service Performance Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Service Performance Overview</h2>
          <div className="space-y-4">
            {data.revenueByService.map((service, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${service.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {data.topBookedServices.find(s => s.name === service.name)?.bookings || 0} bookings
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Average Appointments per User</h3>
          <p className="text-2xl font-bold text-indigo-600">{data.averageAppointmentsPerUser}</p>
          <p className="text-sm text-gray-500 mt-1">appointments per user</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Most Popular Service</h3>
          <p className="text-2xl font-bold text-orange-600">{data.topBookedServices[0].name}</p>
          <p className="text-sm text-gray-500 mt-1">{data.topBookedServices[0].bookings} bookings</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Peak Hour</h3>
          <p className="text-2xl font-bold text-pink-600">
            {data.peakBookingHours.reduce((max, hour) => 
              hour.bookings > max.bookings ? hour : max
            ).hour}
          </p>
          <p className="text-sm text-gray-500 mt-1">most bookings</p>
        </div>
      </div>
    </div>
  );
};

export default Statics;
