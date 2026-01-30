const Project = require('../models/Project');

// Create Project
exports.createProject = async (req, res) => {
    try {
        const { projectName, description } = req.body;

        // Requirement Engine
        const requirements = generateRequirements(description);

        const project = await Project.create({
            projectName,
            description,
            requirements,
            userId: req.userId
        });

        res.json(project);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// ... (getProjects, getProject, deleteProject remain same - skipping for brevity if not changing) ...
// ACTUALLY I CANNOT SKIP LINES IN REPLACE_FILE_CONTENT.
// I will just replace the createProject and generateRequirements functions.

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.userId });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// ------------------
// Requirement Engine
// ------------------

function generateRequirements(description = "") {
    // Only return what user actually wrote, no defaults
    const base = {
        "User Requirements": []
    };

    if (description) {
        // Split by newlines or periods to get specific points
        const items = description.split(/[\n.]+/).filter(i => i.trim().length > 0);

        items.forEach(item => {
            // Clean up the item
            const cleanItem = item.trim();
            // Capitalize first letter
            const formatted = cleanItem.charAt(0).toUpperCase() + cleanItem.slice(1);
            base["User Requirements"].push(formatted);
        });
    }

    // Default if empty
    if (base["User Requirements"].length === 0) {
        base["User Requirements"].push("No specific requirements provided.");
    }

    return base;
}

module.exports.generateRequirements = generateRequirements;