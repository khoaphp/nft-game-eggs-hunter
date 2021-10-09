const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const birdSchema = new mongoose.Schema({
    account:String,
    status:Boolean,  // false: wating for payment, true: paid
    createdDate:Date,

    name: String,
    description: String,
    image_url:String, 
    attributes:[
        {
            display_type:String,
            trait_type:String,
            value:String
        },
        {
            display_type:String,
            trait_type:String,
            value:Number
        },
        {
            display_type:String,
            trait_type:String,
            value:Number
        }
    ]
});

birdSchema.plugin(AutoIncrement, {inc_field: 'tokenId'});
module.exports=mongoose.model("Bird", birdSchema);