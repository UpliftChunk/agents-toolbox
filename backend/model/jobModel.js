const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
   title : {
      type: String,
      required: [true,"Please enter Job title"]
   },
   description : {
      type: String,
      required: [true,"Please enter Job Description"]
   },
   status: {
      type: String, // can hav only two values: close/open
      enum: ["Open", "Close"], 
      default: "Open"
   },
   payment: {
      type: {
         minimumPay: Number,
         maximumPay: Number
      },
      required: true,
      // default: {
      //    minimumPay: 0,
      //    maximumPay: 10
      // }
   },
   category : {
      type: String, // field/domain of work
      required: true
   },
   contact_info : {
      type: {
         name: String,
         email: String
      },
      required: true,
   },
   createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
   },
   createdAt : {
      type:Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Job', jobSchema);