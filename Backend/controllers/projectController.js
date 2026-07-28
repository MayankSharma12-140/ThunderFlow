const { createProject ,
     getProjectsByUser,
     getProjectById,
     getFilteredProjects : getFilteredProjectsModel,
     updateProject,
     deleteProject,
    } = require("../models/projectModel");

const addProject = (req, res) => {
    const { title, prompt, generated_code, framework } = req.body;

    const user_id = req.user.id;

    createProject(
        user_id,
        title,
        prompt,
        generated_code,
        framework,
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err.message,
                });
            }

            return res.status(201).json({
                message: "Project created successfully",
                projectId: result.insertId,
            });
        }
    );
};
    const getProjects = (req, res) => {

    const user_id = req.user.id;

    getProjectsByUser(user_id, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message,
            });
        }

        return res.status(200).json({
            projects: results,
        });

    });

};

const getProject = (req, res) => {

    const project_id = req.params.id;
    const user_id = req.user.id;

    getProjectById(project_id, user_id, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        return res.status(200).json(results[0]);

    });

};


const editProject = (req, res) => {

    const project_id = req.params.id;
    const user_id = req.user.id;

    const {
        title,
        prompt,
        generated_code,
        framework,
    } = req.body;

    updateProject(
        project_id,
        user_id,
        title,
        prompt,
        generated_code,
        framework,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Project not found",
                });
            }

            return res.status(200).json({
                message: "Project updated successfully",
            });

        }
    );

};

const removeProject = (req, res) => {

    const project_id = req.params.id;
    const user_id = req.user.id;

    deleteProject(project_id, user_id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        return res.status(200).json({
            message: "Project deleted successfully",
        });

    });

};

const getFilteredProjects = (req, res) => {
    const user_id = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const framework = req.query.framework || "";

    getFilteredProjectsModel(
        user_id,
        search,
        framework,
        limit,
        offset,
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err.message,
                });
            }

            return res.status(200).json({
                page,
                limit,
                total: results.length,
                projects: results,
            });
        }
    );
}; 
module.exports = {
    addProject,
    getProjects,
    getProject,
    getFilteredProjects,
    editProject,
    removeProject,
};