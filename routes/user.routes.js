const express = require("express")
const router = express.Router()

const userController = require("../controller/user.controller")

router.post("/login", userController.auth)

module.exports = router