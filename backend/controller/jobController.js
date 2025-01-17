// import models
const Job = require('../model/jobModel');

// others
const RegularErrorHandler = require('../util/RegularErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { ObjectId } = require('mongodb');

// export controllers

// ..Get All jobs - Everyone
exports.getAllJobs = catchAsyncErrors(async (req, res, next)=>{
   const jobs = await Job.find();
   res.status(200).json({
      success: true,
      message: "all Jobs info retrieved successfully",
      jobs
   })
})

// ..create job - auth user
exports.createJob = catchAsyncErrors(async (req, res, next)=>{
   const {title, description, payment, category} = req.body;
   const contact_info = {
      name: req.user.name,
      email: req.user.email,
   }
   const createdBy = req.user.id;

   const job = await Job.create({
      title,
      description,
      payment,
      category,
      contact_info,
      createdBy
   });
   res.status(201).json({
      success: true,
      message: 'Job created successfully', 
      job
   })
   
})

// ..get user's his created jobs details
exports.getAllCreatedJobsOfUser = catchAsyncErrors(async (req, res, next)=>{
   console.log("im here");
   
   let jobs = await Job.find({createdBy: req.user.id});
   console.log("jobs:",jobs);
   console.log(req.user.id);
   if(!jobs) 
      {return next(new RegularErrorHandler("No Jobs found",404));}
   res.status(200).json({
      success: true,
      message: "all created Jobs info of user retrieved successfully",
      jobs
   })
})

// ..get single job details
exports.getSingleJobDetails = catchAsyncErrors(async (req, res, next)=>{
   let job = await Job.findById(req.params.id);
   
   // if((!job) || (!new ObjectId(job.createdBy).equals(new ObjectId(req.user.id))) ) 
   if((!job)) 
      {return next(new RegularErrorHandler("job not found",404));}

   res.status(200).json({
      success: true,
      message: "Single Job's info retrieved successfully",
      job
   })
})
