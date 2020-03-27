const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true 
}).then(() => {
    console.log('mongodb connection live!')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})