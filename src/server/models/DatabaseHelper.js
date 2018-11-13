/**
 * @description Helper methods with MongoDB
 */
const Database = require('./Database');

class DatabaseHelper {
    
    constructor(databaseString, collectionString) {
        this.database = false;
        this.collection = {};
        this.databaseString = databaseString;
        this.collectionString = collectionString;
    }

    
    async databaseConnection() {
        
        try {
            const database = await new Database();
            await database.connect(this.databaseString);
            const dbObject = await database.dbObj();

            
            this.database = dbObject.db();
            this.collection = this.database.collection(this.collectionString);

            return dbObject;

        } catch (err) {
            return err;
        }

    }

    async create(data) {
        
        try {
            const connection = await this.databaseConnection();
            const insert = await this.collection.insertOne(data);
            connection.close();
            return insert.insertedId;

        } catch (err) {
            return err;
        }

    }

    /**
     * 
     * @description Find all records for collection
     */
    async readAll() {

        try {
            const connection = await this.databaseConnection();
            const data = await this.collection.find().toArray();
            connection.close();
            return data;
        } catch (err) {
            throw err;
        }

    }

}

module.exports = {
    DatabaseHelper
};