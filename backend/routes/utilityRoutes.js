const {Router} = require("express")

const { getUtilities, saveUtilities } = require('../controllers/utilityController')


const authMiddleware = require('../middleware/authMiddleware')

const router = Router();

//define routes
router.get("/:propertyId", getUtilities);
router.post("/", authMiddleware, saveUtilities);

module.exports=router