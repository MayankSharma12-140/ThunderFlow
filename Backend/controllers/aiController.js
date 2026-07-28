const { generateCode } = require("../services/aiService");

const {
    createProject,
    getProjectById,
    updateProject,
} = require("../models/projectModel");

 const generateUI = async (req, res) => {
    try {
        const { title, prompt, framework } = req.body;

        if (!title || !prompt || !framework) {
            return res.status(400).json({
                message: "Title, Prompt and Framework are required",
            });
        }

        const generatedCode = await generateCode(prompt, framework);

        const user_id = req.user.id;

        createProject(
            user_id,
            title,
            prompt,
            generatedCode,
            framework,
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Database Error",
                        error: err.message,
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: "Project generated and saved successfully",
                    projectId: result.insertId,
                    generatedCode,
                });
            }
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "AI Generation Failed",
            error: error.message,
        });
    }
};


const regenerateUI = async (req, res) => {
    try {
        const { instruction } = req.body;
        const project_id = req.params.id;
        const user_id = req.user.id;

        if (!instruction) {
            return res.status(400).json({
                message: "Instruction is required",
            });
        }

        getProjectById(project_id, user_id, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err.message,
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Project not found",
                });
            }

            const project = result[0];

            const updatedPrompt = `
Original Prompt:
${project.prompt}

New Instruction:
${instruction}
`;

            const generatedCode = await generateCode(
                updatedPrompt,
                project.framework
            );

            updateProject(
                project.id,
                user_id,
                project.title,
                updatedPrompt,
                generatedCode,
                project.framework,
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Database Error",
                            error: err.message,
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        message: "Project regenerated successfully",
                        generatedCode,
                    });
                }
            );
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "AI Regeneration Failed",
            error: error.message,
        });
    }
};


module.exports = {
    generateUI,    regenerateUI,
};       
