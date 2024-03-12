const express = require("express")
const router = express.Router()

const transactionController = require("../controller/transaction.controller")

router.get("/", transactionController.getAll)
router.get("/get-by-id/:id", transactionController.getById)
router.get("/get-by-bucket-id/:id", transactionController.getByBucketId)


router.post("/create", transactionController.create)

module.exports = router
