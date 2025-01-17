const express= require('express');
const router = express.Router();

// controllers
const { getAllJobs, getSingleJobDetails, getAllCreatedJobsOfUser, createJob } = require('../controller/jobController');

// auth
const { isAuthenticatedUser } = require('../middleware/isAuth');

// everyone
router.route('/jobs').get(getAllJobs);

// user
router.route('/job/:id').get(getSingleJobDetails);
router.route('/my-jobs').get(isAuthenticatedUser, getAllCreatedJobsOfUser);
router.route('/create-job').post(isAuthenticatedUser, createJob);

module.exports= router;