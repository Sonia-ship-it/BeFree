const cors=require('cors')
const express = require('express');
const app = express()
const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')
require('dotenv').config();
require('./config')
app.use(express.json())
app.use(cors())
const port=process.env.PORT
app.use("/api/register", userRoutes)
app.use("/api/login", authRoutes)
try{
app.listen(port, () => console.log(`Server running at port ${port}`))
}
catch(error) {
    console.log(`Server error: ${error}`)
}