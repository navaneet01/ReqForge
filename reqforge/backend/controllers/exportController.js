const Project = require('../models/Project');
const { generatePDF } = require('../exports/pdfGenerator');

exports.exportPDF = async (req, res) => {
    try {
        console.log("➡ Export API called for ID:", req.params.id);
        const project = await Project.findById(req.params.id);

        if (!project) {
            console.log("❌ Project not found in DB");
            return res.status(404).json({ msg: 'Project not found' });
        }

        console.log("✅ Project found:", project.projectName);
        const filePath = await generatePDF(project);
        console.log("✅ PDF generated at:", filePath);

        res.download(filePath, (err) => {
            if (err) {
                console.error("❌ Download error:", err);
                if (!res.headersSent) res.status(500).send("Download failed");
            }
        });

    } catch (err) {
        console.error("❌ EXPORT CONTROLLER ERROR:", err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};
