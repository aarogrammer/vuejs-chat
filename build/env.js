module.exports = {
    app: {
        mode: "development"
    },
    database: {
        database_url: process.env.VUEJS_CHAT_DATABASE_URL,
        database_messages_collection: process.env.VUEJS_DATABASE_MESSAGES_COLLECTION
    }
}