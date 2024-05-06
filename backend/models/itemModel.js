const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        staffid:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        contact_no:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        dob:{
            type:String,
            required:true,
        },
        nic:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            required:true,
        },
        role_type:{
            type:String,
            required:true,
        },
        salary:{
            type:String,
            required:true,
        },
    
    },
    {timestamp:true}
);
const items = mongoose.model("Staff",itemSchema);

module.exports = items;