const { SlashCommandBuilder } = require('@discordjs/builders');
var rp;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whodatpokemon')
		.setDescription('Begins a game of Whos That Pokemon!'),
	async execute(interaction) {
		rP = Math.floor(Math.random() * (152 - 1) + 1);
		await interaction.reply({
			files: ["./sprites/Black_Sprites/" + rp +".png"]
		});
	},
};
