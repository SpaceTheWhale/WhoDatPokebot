const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config();

// Note to self: define options for command arguments
const commands = [
  new SlashCommandBuilder().setName('whodatpokemon').setDescription('Begins a game of Whos That Pokemon!'),
  new SlashCommandBuilder().setName('end').setDescription('Ends a game of Whos That Pokemon!'),
  new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Enter the name of the Pokemon')
    .addStringOption((option) =>
      option.setName('pokeguess').setDescription('Pokemon name goes here').setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID), {
    body: commands,
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);