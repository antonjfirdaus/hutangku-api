const pool = require("../database/index")

const bucketController = {

    create: async (req, res) => {
        try {
            const { bucket_name, bucket_type } = req.body;
            const sql = 'insert into buckets(bucket_name, bucket_type) values(?, ?)';
            const [rows, fields] = await pool.query(sql, [bucket_name, bucket_type]);
            if (rows.affectedRows) {
                res.status(201).json({ message: "Ok" });
            } else {
                res.status(500).json({ message: 'Failed to create bucket.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create bucket.' });
        }
    },

    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("z")
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve buckets.' });
        }
    },

    getById: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select b.id, b.bucket_name, b.bucket_type, format(coalesce(sum(least(txn.txn_amount,0)),0),0) as amount_total, format(coalesce(sum(greatest(txn.txn_amount,0)),0),0) as amount_bayar, format(coalesce(sum(txn.txn_amount),0),0) as amount_sisa from buckets b left join transactions txn on txn.bucket_id = b.id where b.id = ? group by b.id", [req.params.id])
            if (rows.length > 0) {
                res.json(rows[0])
            } else {
                console.log('No rows returned.');
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve bucket.' });
        }
    },

    getByType: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select b.id, b.bucket_name, b.bucket_type, format(coalesce(sum(least(txn.txn_amount,0)),0),0) as amount_total, format(coalesce(sum(greatest(txn.txn_amount,0)),0),0) as amount_bayar, format(coalesce(sum(txn.txn_amount),0),0) as amount_sisa from buckets b left join transactions txn on txn.bucket_id = b.id where b.bucket_type = ? group by b.id", [req.params.type])
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve bucket.' });
        }
    },

    getSummary: async (req, res) => {
        try {
            // Get a connection from the pool
            const [rows, fields] = await pool.query("SELECT JSON_OBJECTAGG(bucket_type, amount) as summary from (SELECT buckets.bucket_type, FORMAT(ABS(COALESCE(SUM(transactions.txn_amount),0)),0) as amount FROM buckets LEFT JOIN transactions on transactions.bucket_id = buckets.id GROUP BY buckets.bucket_type ) dt")
            if (rows.length > 0) {
                res.json(rows[0].summary)
            } else {
                console.log('No rows returned.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

module.exports = bucketController
