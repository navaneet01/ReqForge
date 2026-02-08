
const fs = require('fs');
const path = require('path');

console.log("Debug: identifying loaded modules...");

const filesToRequire = [
    './controllers/authController',
    './controllers/projectController',
    './controllers/exportController',
    './routes/authRoutes',
    './routes/projectRoutes',
    './routes/exportRoutes',
    './middlewares/authMiddleware',
    './models/Project',
    './models/User'
];

filesToRequire.forEach(f => {
    try {
        require(f);
    } catch (e) {
        console.log(`Failed to require ${f}: ${e.message}`);
    }
});

console.log("\nLoaded 'user.js' or 'User.js' modules:");
Object.keys(require.cache).forEach(key => {
    if (key.toLowerCase().endsWith('user.js') && !key.includes('node_modules')) {
        console.log(`- ${key}`);
    }
    // Also check for project.js just in case
    // if (key.toLowerCase().endsWith('project.js') && !key.includes('node_modules')) {
    //     console.log(`- ${key}`);
    // }
});
