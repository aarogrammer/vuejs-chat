/**
 * @description API routes
 * @author Aaron Welsh
 * 
 */
const path      = require("path");
const router    = require("express").Router();
const { DatabaseHelper } = require('./models/DatabaseHelper');
const { database_url, database_messages_collection } = require('../../build/env').database;
const databasehelper = new DatabaseHelper(database_url, database_messages_collection);

router.get('/messages', (req, res) => {

    databasehelper.readAll()
    .then(data => {
        const output = [];

        // Iterate through returned object and display only what we need.
        data.forEach(item => {
            output.push({
                username: item.username,
                text: item.text,
                ts: item.ts
            });
        });
        res.json(output); // Output JSON.
    })
    .catch(err => {
        console.error(err)
    });

});

module.exports = router;


