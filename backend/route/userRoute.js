const express = require('express');
const router = express.Router();

const {registerUser, loginUser, logout, getUserDetails, getSingleUser} = require('../controller/userController.js');

const {isAuthenticatedUser} = require('../middleware/isAuth');

router.route('/user/me').get(isAuthenticatedUser, getUserDetails);
router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logout);
router.route('/user/search/:id').get(getSingleUser);



module.exports= router;
// router.route('/password/forgot').post(forgetPassword);
// router.route('/password/reset/:token').put(resetPassword);
// router.route('/password/update').put(isAuthenticatedUser, updatePassword);
// router.route('/me/update').put(isAuthenticatedUser, updateProfile);