const express = require("express")
const router = express.Router()

const bucketController = require("../controller/bucket.controller")

router.get("/", bucketController.getAll)
router.get("/get-by-id/:id", bucketController.getById)
router.get("/get-by-type/:type", bucketController.getByType)
router.get("/summary", bucketController.getSummary)

router.post("/create", bucketController.create)

module.exports = router