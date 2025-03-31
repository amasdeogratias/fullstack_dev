const HttpError = require("../models/errorModel");
const {models} = require("../models")
const Property = models.Property;
const UtilityBill = models.UtilityBill;



//GET /api/properties:
const getProperties = async (req, res, next) => {
    try {
        const response = await Property.findAll({
            order: [['updatedAt', 'DESC']]
        });
        res.status(200).json(response) 
    } catch (error) {
        return next(new HttpError(error))
    }
}

//GET /api/properties/:id:
const getSingleProperty = async (req, res, next) => {
    try {
        const id  = req.params.id;
        const response = await Property.findOne({where: {id: id}});
        if(!response){
            return next(new HttpError("No Post found", 422))
        }
        res.status(200).json(response)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//POST /api/properties:
const saveProperty = async (req, res, next) => {
    try {
        const { name, type, address } = req.body;
        if(!name || !type || !address){
            return next(new HttpError("Fills all fields", 422));
        }

        const newPropertyName = name.toLowerCase();
        
        const propertyExists = await Property.findOne({where: {name: newPropertyName}})
        if(propertyExists){
            return next(new HttpError("This property exists, create new one", 422))
        }

        //create property
        const allowedTypes = ["Residential", "Commercial"];
        if (!allowedTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid  property type" });
        }
        const newProperty = await Property.create({name:newPropertyName, type, address})
        res.status(201).json({
            message: "Property created successfully",
            property: newProperty
        });
    } catch (error) {
        return next(new HttpError(error))
    }
}

//GET /api/utilities/:propertyId:
const getUtilities = async (req, res, next) => {
    try {
        const { propertyId } = req.params;
        // Check if the property exists
        const property = await Property.findByPk(propertyId);
        if (!property) {
            return next(new HttpError("Property not found", 404));
        }
        // Fetch utility bills for the given property
        const utilities = await UtilityBill.findAll({
            where: { property_id: propertyId },
            order: [["date", "DESC"]],
        });

        res.status(200).json(utilities);
    } catch (error) {
        return next(new HttpError(error)) 
    }
}

//POST /api/utilities:
const saveUtilities = async (req, res, next) => {
    try {
        const { type, amount, date, property_id } = req.body;
        // Validate request data
        if (!type || !amount || !date || !property_id) {
            return next(new HttpError("All fields are required", 400));
        }
        // Check if the Property exists
        const property = await Property.findByPk(property_id);
        if (!property) {
            return next(new HttpError("Property not found", 404));
        }

        // Create Utility Bill
        const allowedTypes = ["Electricity", "Water", "Gas"];
        if (!allowedTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid  property type" });
        }
        const newBill = await UtilityBill.create({
            type,
            amount,
            date,
            property_id,
        });
        res.status(201).json(newBill);
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = { getProperties, getSingleProperty, saveProperty, getUtilities, saveUtilities }

