const pool = require("../database/index")

const transactionController = {

    create :async (req, res) => {
        try {
            const { bucket_id, txn_date, txn_amount, description } = req.body;
            const sql = 'insert into transactions (bucket_id, txn_date, txn_amount, description) values(?, ?, ?, ?)';
            const [rows, fields] = await pool.query(sql, [bucket_id, txn_date, txn_amount, description]);
            if (rows.affectedRows) {
                res.status(201).json({ message: "Ok" });
            }else{
                res.status(500).json({ message: 'Failed to create bucket.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create bucket.' });
        }
    },
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from transactions")
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve transactions.' });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from transactions where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getByBucketId: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from transactions where bucket_id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = transactionController
