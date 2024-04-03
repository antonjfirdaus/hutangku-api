const pool = require("../database/index")

const userController = {
    
    auth: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from app_user where username = ? and password = ?", [req.params.username, req.params.password])
            res.json(rows)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Failed to retrieve bucket.' });
        }
    }
};

module.exports = userController
