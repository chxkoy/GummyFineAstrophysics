module.exports.config = {
  name: "emi",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "Developer | API by AkhiroDEV, Rui, Joshua",
  description: "generate image from emi.",
  usages: "emi [promt]",
  cooldowns: 5,

};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const { threadID, messageID } = event;
  const query = args.join(" ");
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_betch.png`;
  if (!query) return api.sendMessage("Please provide your prompt.", threadID, messageID);
    api.sendMessage(`⏳ | Generating image “${query}”`, event.threadID, event.messageID);
  const poli = (await axios.get(`https://akhiro-rest-api.onrender.com/api/emi?q=${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    setTimeout(function() {
  api.sendMessage({
    body: "Here’s the generated image from emi API",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path));
    }, 5000);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
