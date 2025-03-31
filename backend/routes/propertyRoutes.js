const { Router } = require("express");

const { 
    getProperties, 
    getSingleProperty, 
    saveProperty 
} = require("../controllers/propertiesController");

const authMiddleware = require('../middleware/authMiddleware')

const router = Router();

//define routes
router.get("/", getProperties);
router.get("/:id", getSingleProperty);
router.post("/", authMiddleware, saveProperty);

module.exports=router