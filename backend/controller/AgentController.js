// import models
const Agent = require('../model/agentModel');

// others
const RegularErrorHandler = require('../util/RegularErrorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// export controllers

// ..Get All agents - Everyone
exports.getAllAgents = catchAsyncErrors(async (req, res, next)=>{
   
   const agents = await Agent.find();
   res.status(200).json({
      success: true,
      message: "all Agents info retrieved successfully",
      agents
   })
})

// ..create agent - auth user
exports.createAgent = catchAsyncErrors(async (req, res, next)=>{
   req.body.createdBy = req.user.id;
   req.body.creatorName = req.user.name;
   const agent = await Agent.create(req.body);
   res.status(201).json({
      success: true,
      message: 'Agent created successfully', 
      agent
   })
})

// ..get user's his created agents details
exports.getCreatedAgentsOfUser = catchAsyncErrors(async (req, res, next)=>{
   console.log(req.user);
   
   let agents = await Agent.find({createdBy: req.user._id});
   if(!agents) 
      {return next(new RegularErrorHandler("No Agents found",404));}
   res.status(200).json({
      success: true,
      message: "all created Agents info of user retrieved successfully",
      agents
   })
})

// ..get single agent details
exports.getSingleAgentDetails = catchAsyncErrors(async (req, res, next)=>{
   
   let agent = await Agent.findById(req.params.id);
   if(!agent) 
      {return next(new RegularErrorHandler("agent not found",404));}

   res.status(200).json({
      success: true,
      message: "Single Agent's info retrieved successfully",
      agent
   })
})

// ..get agents with name
exports.getSpecificAgents = catchAsyncErrors( async(req, res, next) => {
   const search= req.query.keyword? {
      agent_name:{
         $regex: req.query.keyword,
         $options: 'i'
      },
      description:{
         $regex: req.query.keyword,
         $options: 'i'
      },
      // createdBy: {
      //    $nin: [req.user.id]
      // }
   }:{}
   // console.log(req.query.keyword);
   // console.log(search);
   
   const agents = await Agent.find(search);

   if(agents.length === 0)
      return next(new RegularErrorHandler(`No agents found with the keyword ${req.query.keyword}`,404)); 

   res.status(200).json({
      success: true,
      message: "Agents retrieved successfully",
      agents
   })
})