/**
 * @description Main routes file. Loaded in to server.js as middleware.
 * @author Aaron Welsh
 * 
 */
const path  = require("path");
const router   = require("express").Router();

// Serve home page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/', 'index.html'));
});

module.exports = router;


