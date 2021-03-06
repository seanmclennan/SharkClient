const { Command } = require('klasa');
const ModLog = require('../../lib/structures/ModLog');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			requiredPermissions: ['MANAGE_ROLES'],
			runIn: ['text'],
			description: 'Unmutes a mentioned user.',
			usage: '<member:member> [reason:...string]',
			usageDelim: ' '
		});
	}

	async run(msg, [member, reason]) {
		if (member.roles.highest.position >= msg.member.roles.highest.position) throw 'You cannot unmute this user.';
		if (!member.roles.cache.has(msg.guild.settings.roles.muted)) throw 'This user is not muted.';

		await member.roles.remove(msg.guild.settings.roles.muted);

		if(msg.guild.settings.get("toggles.modlogs")){
			await new ModLog(msg.guild)
				.setType("unmute")
				.setModerator(msg.author)
				.setReason(reason)
				.setUser(member.user)
				.send();
		}

		return msg.sendMessage(`${member.user.tag} was unmuted.${reason ? ` With reason of: ${reason}` : ''}`);
	}

};