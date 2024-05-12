const axios = require('axios');
module.exports.config = {
  name: 'bbgpt',
  hasPermssion: 0,
  credits: "developer",
  description: 'Educational Cimmand',
  usePrefix: false,
  commandCategory: 'educational',
  usages: 'bbgpt <question>',
  cooldown: 2,
};
module.exports.run = async function({ api, event, args }) {
  try {
    const prompt = encodeURIComponent(args.join(" "));
    if (!prompt) return api.sendMessage("Please enter a prompt.", event.threadID, event.messageID);
    api.sendMessage("Processing your request...", event.threadID, event.messageID);
    const apiUrl = "https://boxgptapi.replit.app/api/blackbox?msg=";
    const response = await axios.get(apiUrl + prompt);
    const responseData = response.data.message;

    await api.sendMessage(`${responseData}`, event.threadID);
  } catch (error) {
    console.error(error);
    return api.sendMessage(error.message, event.threadID, event.messageID);
  }
};