require('dotenv').config()

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors());

const userRouter = require('./routes/user.routes')
const bucketRouter = require('./routes/bucket.router')
const transactionRouter = require('./routes/transaction.router')

app.get("/", (req, res) => res.send("Hutangku api is running"));

app.use('/user', userRouter)
app.use("/bucket", bucketRouter)
app.use("/transaction", transactionRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running at port " + PORT+ " ....")
})
