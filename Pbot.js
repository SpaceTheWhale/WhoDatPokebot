// Who's That Pokemon Discord Bot

// Require the necessary discord.js classes
const fetch = require('node-fetch');
const { Client, Collection, Intents } = require('discord.js');
const { isMessageComponentDMInteraction } = require('discord-api-types/utils/v9');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// Set .env vars
const serverID = process.env.SERVERID;
const channelID = process.env.CHANNELID;
let rP;
let url = 'https://pokeapi.co/api/v2/pokemon/';
let pokeAPIName;
let id;
let gameOngoing;

// Login to Discord with your client's token
client.login(process.env.TOKEN);

// When the client is ready, run this code (only once)
client.once('ready', botReady);

function botReady() {
	console.log('Bot is ready!'); 
}

async function pokeAPIcall(data){
	// Set bool for bot to keep listening for answer
	gameOngoing = true;
	
	//when function called, choose a random Pokemon ID between 1 and 150, can be changed to include more generations up to 898
	rP = Math.floor(Math.random() * (152 - 1) + 1);
  
	try{
	  //request data from the API
	  let response = await fetch(url+rP+'/');
	  
	  //recieve data in a json file
	  let data = await response.json();
	  //console.log(data);
	  
	  //Assign data to variables
	  let tempName = data.name;
	  pokeAPIName = tempName.replace(/[^a-zA-Z ]/g, "");
	  console.log(pokeAPIName);
	  id = data.id;
  
	} catch(error){
	  console.log('Something broke yo')
	}

}


client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;
  
	const { commandName, user, options } = interaction;
	console.log(commandName, user.username);
  
	if (commandName === 'whodatpokemon') {
		// run the API call function
		await pokeAPIcall();

	// if the user starts the game, send a blackened image
		await interaction.reply("https://raw.githubusercontent.com/SpaceTheWhale/WhoDatPokebot/main/commands/sprites/Black_Sprites/" + id + ".png")
	} else if (commandName === 'guess') {

	// get the users guess and store in a variables
	  let userGuess = options.getString('pokeguess');
	  let result = userGuess.toLowerCase();
	  console.log(result);

	// compare the users guess to the pokemon's name
	  if(gameOngoing = true && result === pokeAPIName){
		  
		  //if it matches, reply user who answered correctly
		  await interaction.reply('Ding ding ding! ' + interaction.user.username + ' wins! The pokemon was ' + pokeAPIName + '!');  
		  await interaction.followUp("https://raw.githubusercontent.com/SpaceTheWhale/WhoDatPokebot/main/commands/sprites/Full_Sprites/" + id + '.png');
		  
	  } else if(gameOngoing = false){
		  
			//if it does not match, reply try again message
			interaction.reply({ content: "There is no active game, please type /whodatpokemon to start a new game.", ephemeral: true})

		  }
		else if(gameOngoing = true && userGuess != pokeAPIName){
			
			//if it does not match, reply try again message
			  interaction.reply({ content: 'Sorry this is incorrect, try again', ephemeral: true });
			  
			}  
	} else if( commandName === 'end'){
			gameOngoing = false;
			await interaction.reply('It was ' + pokeAPIName + '! That was a hard one! The game is now over.');
			await interaction.followUp("https://raw.githubusercontent.com/SpaceTheWhale/WhoDatPokebot/main/commands/sprites/Full_Sprites/" + id + '.png');
			
	}
});


//Things to do:
// need to deploy commands
// add ephemeral to Incorrect
// add regex
// does async work in node
// funny incorrect responses- if time
// end listening for /guess after first user gets it correct
// what do I do when no one knows and wants to end or restart ( add "end" command, then add "end" function that triggers when first user is correct)
// think about using timers and storing order of who got it right