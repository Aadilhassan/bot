//express server that let the bot run 24/7
const express = require('express')
const app = express();
const port = 3001;
app.get('/', (req, res) => {
  res.send('Your joey Tribbiani Bot is ready to talk. go back to the discord Server and start talking ')
})
app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
  console.log("Server is running.");
});
const Discord = require('discord.js');
// node-fetch for making HTTP requests
const fetch = require('node-fetch');

// initialize client
const client = new Discord.Client();
// my model URL
API_URL = 'https://api-inference.huggingface.co/models/aadilhassan/Chandlerbot';

// log out some info
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// when the bot receives a message
// need async message because we are making HTTP requests
client.on('message', async message => {
    // ignore messages from the bot itself
    if (message.author.bot) {
        return;
    }
    // form the payload
    const payload = {
        inputs: {
            text: message.content
        }
    };
    // form the request headers with Hugging Face API key
    const headers = {
        'Authorization': 'Bearer ' + process.env.HUGGINGFACE_TOKEN
    };
    
    // set status to typing
    message.channel.startTyping();
    // query the server
    const response = await fetch(API_URL, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: headers
    });
    const data = await response.json();
    let botResponse = '';
    if (data.hasOwnProperty('generated_text')) {
        botResponse = data.generated_text;
    } else if (data.hasOwnProperty('error')) { // error condition
        botResponse = data.error;
    }
    // stop typing
    message.channel.stopTyping();
    // send message to channel as a reply
    message.reply(botResponse);
})

client.login(process.env.DISCORD_TOKEN);

    var http = require("http");
setInterval(function() {
    http.get("http://bot-aadil.herokuapp.com");
}, 300000);
