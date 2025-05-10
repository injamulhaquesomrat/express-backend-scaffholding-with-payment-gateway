/**
 * Auth Routes Module
 *
 * This module defines the routes for user authentication, including signup and signin.
 *
 * @module routes/authRoutes
 * @requires express
 * @requires ../controllers/authController
 */

const express = require("express");
const { signup, signin } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
