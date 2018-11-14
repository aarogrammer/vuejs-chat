/**
 * @description Create a database connection with MongoDB.
 */
const { MongoClient }   = require('mongodb');

class Database {

    constructor() {
        this.db = {};
    }

    async connect(connectionString) {
        
        try {
            const connection = await MongoClient.connect(connectionString, { useNewUrlParser: true });
            this.db = await connection;
        } catch(err) {
            return err;
        }

    }

    dbObj() {
        return this.db;
    }

}

module.exports = Database;