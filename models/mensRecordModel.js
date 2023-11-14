import mongoose from 'mongoose';

const MensRecordsSchema = new mongoose.Schema({
    ranking :{
        type : Number,
        required: true,
        unique: true,
    },
    name : {
        type : String,
        required: true,
        trim: true,
    },
    dob :{
        type : Date,
        required: true,
        trim: true,
    },
    country : {
        type : String,
        required: true,
        trim: true,
    },
    score : {
        type : Number,
        required: true,
        trim: true,
    },
    event : {
        type : String,
        default : "100M"
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "MensRankSchema",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const MensRecordsModel = new mongoose.model('Record' , MensRecordsSchema)

export default MensRecordsModel