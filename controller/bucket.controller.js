const pool = require("../database/index")

const bucketController = {
    
    create : async (req, res) => {
        try {
            const { bucket_name, bucket_type } = req.body;
            const sql = 'insert into buckets(bucket_name, bucket_type) values(?, ?)';
            const [rows, fields] = await pool.query(sql, [bucket_name, bucket_type]);
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
            const [rows, fields] = await pool.query("select b.id, b.bucket_name, b.bucket_type, coalesce(sum(least(txn.txn_amount,0)),0) as amount_total, coalesce(sum(greatest(txn.txn_amount,0)),0) as amount_bayar, coalesce(sum(txn.txn_amount),0) as amount_sisa from buckets b left join transactions txn on txn.bucket_id = b.id group by b.id")
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve buckets.' });
        }
    },

    getById: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from buckets where id = ?", [req.params.id])
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve bucket.' });
        }
    },

    getByType: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select b.id, b.bucket_name, b.bucket_type, coalesce(sum(least(txn.txn_amount,0)),0) as amount_total, coalesce(sum(greatest(txn.txn_amount,0)),0) as amount_bayar, coalesce(sum(txn.txn_amount),0) as amount_sisa from buckets b left join transactions txn on txn.bucket_id = b.id where b.bucket_type = ? group by b.id", [req.params.type])
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve bucket.' });
        }
    },

    getSummary: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT b.bucket_type, coalesce(sum(txn.txn_amount),0) as bucket_amount from buckets b LEFT JOIN transactions txn on txn.bucket_id = b.id group by b.bucket_type")
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve bucket summary.' });
        }
    },

};

module.exports = bucketController
