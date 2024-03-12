const pool = require("../database/index")

const bucketController = {
    
    create : async (req, res) => {
        try {
            const { bucket_name, bucket_type } = req.body;
            const sql = 'insert into buckets(bucket_name, bucket_type) values(?, ?)';
            const [rows, fields] = await Bucket.create(sql, [bucket_name, bucket_type]);
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
            const [rows, fields] = await pool.query("select * from buckets")
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
            const [rows, fields] = await pool.query("select * from buckets where bucket_type = ?", [req.params.type])
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve bucket.' });
        }
    },

};

module.exports = bucketController
