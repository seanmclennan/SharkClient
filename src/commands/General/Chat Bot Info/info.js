const { Command } = require('klasa');
const Discord = require('discord.js')

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			guarded: true,
			description: language => language.get('COMMAND_INFO_DESCRIPTION')
		});
	}

	async run(message) {
		const guildPrefix = message.guild.settings.get('prefix')
		const embed = new Discord.MessageEmbed()
			.setAuthor('───── Shark Bot#5422 ─────')
			.setThumbnail(this.client.user.displayAvatarURL())
			.setColor("BLUE")
			.setDescription(`》To get started, run \`${guildPrefix}help\` to see a list of commands that you can use. \n 》You can @mention me to get my prefix too! \n 》Running \`${guildPrefix}prefix\` will show you the current prefix for the server. Change it with \`${guildPrefix}prefix <prefix>\` \n 》Unlock the full experience of the bot by setting it up with the command \`${guildPrefix}conf show\` (mods only) \n \n A Discord bot created by **Bean.#0002** \n \n With love, \n - Bean`)
			.setFooter('Support server soon™️')

		message.send(embed)
	}

};
