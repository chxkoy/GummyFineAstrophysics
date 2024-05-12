module.exports.config = {
	name: "ai",
	version: "30.0.0",
	hasPermssion: 0,
	credits: "Developer",
	description: "ChatGpt",
	commandCategory: "Other",
	usages: "ai <question>",
	hasPrefix: false,
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => { 
	const { gpt } = require("gpti");
	let query = args.join(" ");
	gpt.v1({
			prompt: query,
			model: "GPT-4",
			markdown: false
	}, (err, data) => {
			if(err != null){
					console.log(err);
					api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
			} else {
					api.sendMessage(data.gpt + '\n\nThis Automated Bot website was created by vixeenn, kindly dm if you have any questions.\n› https://facebook.com/xenvrnslol', event.threadID, event.messageID);
			}
	});
};