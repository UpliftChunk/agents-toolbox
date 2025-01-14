const express= require('express');
const router = express.Router();

// controllers
const { getAllAgents, getSingleAgentDetails, getCreatedAgentsOfUser, createAgent, getSpecificAgents} = require('../controller/AgentController');
// const { acceptBidReq, createLotBid, makePayment } = require('../controller/HybridController');

// auth
const { isAuthenticatedUser } = require('../middleware/isAuth');

// everyone
// router.route('/agents').get(getAllAgents);
router.route('/agents').get(getSpecificAgents);
router.route('/agent/:id').get(getSingleAgentDetails);

// user
router.route('/my-agents').get(isAuthenticatedUser, getCreatedAgentsOfUser);
router.route('/create-agent').post(isAuthenticatedUser, createAgent);
// router.route('/agent/buy').post(isAuthenticatedUser, makePayment);

module.exports= router;