//  create token and save in cookie || send token to cookie
const sendToken = (user, statusCode, message, res)=>{
   const token = user.getJWTToken();

   // options for cookie
   const options = {
      path: "/",
      expires: new Date(
         Date.now() + process.env.COOKIE_EXPIRE *24 *60 *60 *1000
      ),
      httpOnly: true
   }
   console.log("token saved in res cookie");
   
   res.status(statusCode).cookie("token", token, options).json({
      success: true,
      message,
      user,
      token
   })
}

module.exports = sendToken;