import express from 'express';
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from '../controller/user.controller.js';

const Router = express.Router();

//apply middleware to all routes
Router.use(protectRoute);

Router.get("/",getRecommendedUsers);
Router.get("/friends",getMyFriends);

Router.post("/friend-request/:id",sendFriendRequest);
Router.put("/friend-request/:id/accept",acceptFriendRequest);

Router.get("/friend-request",getFriendRequests);
Router.get("/outgoing-friend-request",getOutgoingFriendReqs);

export default Router;