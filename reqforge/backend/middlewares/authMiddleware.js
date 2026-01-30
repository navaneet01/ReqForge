const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: 'No token' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'secretkey123');
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};