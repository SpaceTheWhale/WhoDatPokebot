const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guess')
		.setDescription('Enter the name of the Pokemon!'),
	async execute(interaction) {
		await interaction.reply('TBD!');
	},
};

// Pseudo Code

// if user guess matches rP, return correct
// else, return incorrect