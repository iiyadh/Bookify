const Service = require('../model/Service');

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addService = async (req, res) => {
    const { title, duration ,description, category, price } = req.body;
    try {
        const newService = new Service({
            title,
            description,
            duration,
            category,
            price
        });
        await newService.save();
        res.status(201).json({ message: 'Service added successfully' , service: newService });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const editService = async (req, res) => {
    const serviceId = req.params.id;
    const { title, description, category,duration, price } = req.body;
    try {
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        service.title = title;
        service.description = description;
        service.category = category;
        service.price = price;
        service.duration = duration;
        await service.save();
        res.json({ message: 'Service updated successfully' , service });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteService = async (req, res) => {
    const serviceId = req.params.id;
    try {
        const service = await Service.findByIdAndDelete(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllServices,
    addService,
    editService,
    deleteService
};