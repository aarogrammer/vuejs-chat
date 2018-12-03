# VueJS Chat

## Currently being refactored...

Real-time chat application built with Node.js, VueJS & Socket.io.  

This application uses Socket.io to send messages in real-time. VueJS is used to bind data to the DOM and to easily manipulate the data.  
I use some ES6 syntax so please use Node 8, or change the syntax.


## Installation
1. Clone the repository 
2. CD in to the directory that was cloned 
3. Install dependencies `npm i`   
4. Build your application `npm run build`
5. Start the application `npm run dev` or `npm start` (depending if you have `nodemon` installed)

## Environment Variables

| Command | Description | Example/More Information |
| --- | --- | --- |
| `export VUEJS_CHAT_DATABASE_URL=''` | The URL of your MongoDB instance. | mongodb://localhost:27017/chat |
| `export database_messages_collection=''` | The name of the collection you want to save and read messages from. | messages |

## Author
Aaron Welsh  
http://aaron-welsh.co.uk

## License

[MIT](http://opensource.org/licenses/MIT)
