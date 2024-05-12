const axios = require('axios');
const moment = require('moment-timezone');

module.exports.config = {
  name: 'snow',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['snow', 'ai'],
  description: "An AI command powered by Snowflakes AI",
  usage: "snowflakes [prompt]",
  credits: 'Developer | API by Hashier Holmes',//modified by joshua Apostol
  cooldown: 3,
};
 
module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  const timeString = moment.tz('Asia/Manila').format('LLL');
 
  if (!input) {
    api.sendMessage(`Please provide a question/query.`, event.threadID, event.messageID);
    return;
  }
 
  api.sendMessage(`Searching for Snowflakes AI response....`, event.threadID, event.messageID);
 
  try {
    const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
    if (data.response) {
      api.sendMessage(`${data.response}\n\nThis Automated Bot website was created by vixeenn, kindly dm if you have any questions.\n› https://facebook.com/xenvrnslol\n› ${timeString}`, event.threadID, event.messageID);
    } else {
      api.sendMessage('No response found.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
