const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
   agent_name : {
      type: String,
      required: [true,"Please enter Agent Name"],
      // required: true,
      trim: true
   },
   description : {
      type: String,
      required: [true,"Please enter agent Description"]
   },
   usecases: {
      type: Array,
      default: []
   },
   image : {
      type: {
         name: String,
         tag: String
      },
      required: [true,"Please enter image details"]
   },
   rating : {
      type: Number,
      default: 0
   },
   accessToken:{
      type: String,
      required: [true],
      select: false
   },
   pricePerHour : {
      type: Number,
      default: 5
   },
   numOfActiveInstances : {
      type: Number,
      default: 0
   },
   specs : {
      type: {
         vm: {
            type: String,
            required: true
         },
         cpu: {
            type: Number,
            required: true
         },
         gpu: {
            type: Number,
            required: true
         },
         memory: {
            type: Number, // in gigabytes
            required: true
         }
      },
      default: {
         vm : "ubuntu",
         cpu : 1,
         gpu: 0,
         memory: 4
      }
   },
   options:{
      type: {
         volumes: {

         },
         networks:{

         },
         env:{
      
         },
      },
      default: {
         
      }
   },
   totalBuys: { // total no.of times equipped / hired / used / downloaded 
      type: Number,
      default: 0
   },
   createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
   },
   creatorName:{
      type: String,
      required: true
   },
   createdAt : {
      type:Date,
      default: Date.now
   }
});

module.exports = mongoose.model('Agent', agentSchema);