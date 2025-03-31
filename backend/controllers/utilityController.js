const HttpError = require("../models/errorModel");
const {models} = require("../models")
const Property = models.Property;
const UtilityBill = models.UtilityBill;



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

module.exports = { getUtilities, saveUtilities }

