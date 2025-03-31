const express = require("express")
const { config } = require("dotenv");
config()
const cors = require('cors')

//db
const db = require("./models")

//middleware routes
const {notFound, errorHandler} = require('./middleware/errorMiddleware')


const authRoutes = require("./routes/authRoutes")
const propertyRoutes = require("./routes/propertyRoutes")
const utilityRoutes = require("./routes/utilityRoutes")



const app = express();
app.use(express.json({extended: true}))
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/utilities", utilityRoutes);
app.use(notFound);
app.use(errorHandler);

db.sequelize.sync()
.then(() => {
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
})
.catch(err => {
    console.log('Unable to run the server:', err);
});