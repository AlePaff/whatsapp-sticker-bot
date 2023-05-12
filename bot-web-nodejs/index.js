const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

const client = new Client()

/*
const SESSION_FILE_PATH = './session.json';
// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}


const client = new Client({
    authStrategy: new LocalAuth(
        {'dataPath':SESSION_FILE_PATH}
    )
});
 

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});
*/

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
        console.log(chats[0]);
    });
    console.log("Listo")
});

client.on('message_create', async (msg) => {
    console.log("mensaje propio: ")
    console.log(msg.body);
    
    if (msg.body == '!ping') {
        client.reply('pong');
    }

});


client.on('message', msg => {
    console.log("mensaje: ")
    console.log(msg.body);

    if (msg.body == '!ping') {
        client.reply('pong');
    }

});



client.initialize();
