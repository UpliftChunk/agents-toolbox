// import model
const User = require("../model/userModel");

// others
const RegularErrorHandler = require("../util/RegularErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require('../util/jwtToken');
// const sendEmail = require('../util/sendEmail.js');
// const crypto = require('crypto');
const cloudinary = require('cloudinary');


// export controllers

// register a user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
   let avatar = {};
   if(req.files?.avatar){
      const mycloud =  await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath,{
            folder: "AgentToolbox/avatars", //avatars
            width: 200,
            crop: 'scale'
      });
      avatar.public_id = mycloud.public_id;
      avatar.url = mycloud.secure_url;
   }
   const {name, email, password} = req.body;

   const user1 = await User.create({
      name,
      email,
      password,
      avatar
   });
   
   const user = await User.findOne({ email });
   sendToken(user, 201, "User created successfully", res);
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
   const {email, password} = req.body;
   console.log(email, password);
   // statusCode-400 bad request
   if(!email)
      return next(new RegularErrorHandler("Please enter an email", 400));
   if(!password)
      return next(new RegularErrorHandler("Please enter the password", 400));

   let user = await User.findOne({ email }).select("+password");
   console.log(user);
   // statusCode-401 unauthorized request
   if(!user)
      return next(new RegularErrorHandler("Invalid email or password", 401));
   
   const Matched = await user.comparePassword(password);
   console.log(password, Matched);
   if(!Matched) 
      return next(new RegularErrorHandler("Invalid email or password", 401));
      
   user = await User.findOne({ email });
   
   sendToken(user, 200, "User logged-in successfully", res);
})

// logout user
exports.logout = catchAsyncErrors( async (req, res, next) => {
   res.cookie("token",null,{
      expires: new Date(Date.now()),
      httpOnly: true
   });
   res.status(200).json({
      success: true,
      message: `Logged Out successfully`
   });
})


// get user his own details
exports.getUserDetails = catchAsyncErrors( async(req, res, next) => {
   const user = await User.findById(req.user.id);
   res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      user
   })
})


// ..get single user
exports.getSingleUser = catchAsyncErrors( async(req, res, next) => {
   const user = await User.findById(req.params.id);
   if(!user)
      return next(new RegularErrorHandler(`User does not exist with id ${req.params.id}`)); 
   res.status(200).json({
      success: true,
      message: "User info retrieved successfully",
      user
   })
})

// ..get users with name
// exports.getUsers = catchAsyncErrors( async(req, res, next) => {
//    const search= req.query.name? {
//       name:{
//          $regex: req.query.name,
//          $options: 'i'
//       },
//       _id: {
//          $nin: [req.user.id]
//       },
//       role: {
//          $ne: `customer`
//       }
//    }:{}
//    const user = await User.find(search, {'name':1, 'location':1, 'dealsClosed':1, 'avatar':1});

//    if(user.length === 0)
//       return next(new RegularErrorHandler(`No other users found with name ${req.query.name}`)); 

//    res.status(200).json({
//       success: true,
//       message: "Users retrieved successfully",
//       user
//    })
// })

