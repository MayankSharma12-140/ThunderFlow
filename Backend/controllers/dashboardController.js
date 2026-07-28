const { getProjectsByUser } = require("../models/projectModel");

const getDashboard = (req, res) => {
    const user_id = req.user.id;

    getProjectsByUser(user_id, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message,
            });
        }

        const dashboard = {
            totalProjects: results.length,
            recentProjects: results.slice(0, 5),
        };

        return res.status(200).json(dashboard);
    });
};

module.exports = {
    getDashboard,
};