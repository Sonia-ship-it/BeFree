const cors=require('cors')
const express = require('express');
const app = express()
const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')
require('dotenv').config();
require('./config')
app.use(express.json())
app.use(cors({
    origin: [
    "http://localhost:5173",
    "https://be-free-frontend.vercel.app"
    ],// allow React app
  credentials: true,
}))
const port=process.env.PORT
app.use("/register", userRoutes)
app.use("/login", authRoutes)
try{
app.listen(port, () => console.log(`Server running at port ${port}`))
}
catch(error) {
    console.log(`Server error: ${error}`)
}