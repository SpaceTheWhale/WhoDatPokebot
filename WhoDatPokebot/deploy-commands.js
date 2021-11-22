const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config();

const commands = [
	new SlashCommandBuilder().setName('whodatpokemon').setDescription('Replies with a pokemon'),

]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APPID, process.env.SERVERID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);