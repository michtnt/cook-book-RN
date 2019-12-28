const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: Number
    },
    name:{
        type: String,
        minlength: 1,
        required: true
    },
    photo_url:{
        type: String,
        default: "https://download.hipwallpaper.com/desktop/1920/1080/64/42/Dz3aw7.jpg"
    },
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ]
})

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})

module.exports = mongoose.model('Category', categorySchema)
