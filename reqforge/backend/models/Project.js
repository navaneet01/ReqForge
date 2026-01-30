const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: String,
    description: String,
    projectType: { type: String, default: 'Custom' },
    modules: { type: Array, default: [] },
    requirements: Object,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);