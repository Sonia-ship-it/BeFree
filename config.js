const mongoose=require('mongoose')
try{
mongoose.connect(process.env.MONGO_URL)
console.log("Connect to DB successfully")
}
catch(err) {
    console.log(`Failed to connect: ${err}`)
    process.exit(1)
}