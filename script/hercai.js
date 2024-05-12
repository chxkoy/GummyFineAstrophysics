const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'hercai',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "An AI command powered by Hercai",
  usage: "hercai [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after “hercai”`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 | “${input}”`, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage(response.reply + '\n\nThis Automated Bot website was created by vixeenn, kindly dm if you have any questions.\n› https://facebook.com/xenvrnslol', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
