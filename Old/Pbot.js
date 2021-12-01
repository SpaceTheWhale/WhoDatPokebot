// Who's That Pokemon Discord Bot

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Set .env vars
const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;
var rP;

// Login to Discord with your client's token
client.login(process.env.token);

// When the client is ready, run this code (only once)
client.once('ready', botReady);

function botReady() {
	console.log('Bot is ready!'); 
}


client.on('interactionCreate', async (interaction) => {
	if (interaction.commandName === 'whodatpokemon') {
		rP = Math.floor(Math.random() * (152 - 1) + 1);
		await interaction.reply("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+rP+".png");
    }
});




