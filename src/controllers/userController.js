const User = require('../models/user');

exports.getUser = (req, res) => {
    const user = new User('Alice', 'alice@example.com');
    res.json({ user: user.getDetails() });
};
