//File created by Mohammad Nayan and fully coded by Nayan

const axios = require('axios');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "talk with bot",
    prefix: 'awto',
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event, handleReply }) {
    try {
      const response = await axios.get(`http://37.27.114.136:25472/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.data.msg;


      api.sendMessage(result, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },



  start: async function ({ nayan, events, args, Users, permission }) {
    try {
      const msg = args.join(" ");
      const userPermission = events.senderID && (await Users.getData(events.senderID)).permission;
      const admin = global.config.ADMINBOT;
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;

      if (!msg) {
        const tl = [
  "ржЖрж╣ рж╢рзБржирж╛ ржЖржорж╛рж░ рждрзЛржорж╛рж░ ржЕрж▓рж┐рждрзЗ ржЧрж▓рж┐рждрзЗ ржЙржорзНржорж╛рж╣ЁЯШЗЁЯШШ",
  " ржХрж┐ ржЧрзЛ рж╕рзЛржирж╛ ржЖржорж╛ржХрзЗ ржбрж╛ржХржЫ ржХрзЗржирзЛ",
  "ржмрж╛рж░ ржмрж╛рж░ ржЖржорж╛ржХрзЗ ржбрж╛ржХрж╕ ржХрзЗржиЁЯШб",
  "ржЖрж╣ рж╢рзЛржирж╛ ржЖржорж╛рж░ ржЖржорж╛ржХрзЗ ржПрждрзЛ ржбрж╛ржХрзНрждрж╛ржЫрзЛ ржХрзЗржирзЛ ржЖрж╕рзЛ ржмрзБржХрзЗ ржЖрж╢рзЛЁЯе▒",
  "рж╣рзБржо ржЬрж╛ржи рждрзЛржорж╛рж░ ржЕржЗржЦрж╛ржирзЗ ржЙржорзНржоржорж╛рж╣ЁЯШ╖ЁЯШШ",
  " ржЖрж╕рж╕рж╛рж▓рж╛ржорзБ ржЖрж▓рж╛ржЗржХрзБржо ржмрж▓рзЗржи ржЖржкржирж╛рж░ ржЬржирзНржп ржХрж┐ ржХрж░рждрзЗ ржкрж╛рж░рж┐",
  "ржЖржорж╛ржХрзЗ ржПрждрзЛ ржирж╛ ржбрзЗржХрзЗ ржмрж╕ ржирзЯржиржХрзЗ ржПржХржЯрж╛ ржЧржл ржжрзЗ ЁЯЩД",
  "jang hanga korba",
  "jang bal falabaЁЯЩВ"
];
        var name = await Users.getNameUser(events.senderID);
        var rand = tl[Math.floor(Math.random() * tl.length)];
        return nayan.reply({ 
              body: `тХнтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтЭН\nтХ░тЮд ЁЯСд ЁЭРГЁЭРЮЁЭРЪЁЭРл уАО${name}уАП,\nтХ░тЮд ЁЯЧгя╕П ${rand}\nтХ░тФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтФАтЮд`, 
              mentions: [{ tag: name, id: events.senderID }] }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      } 

        else if (msg.startsWith("delete")) {
            const userPermission = events.senderID && (await Users.getData(events.senderID)).permission;
            const admin = global.config.ADMINBOT;

            if (!admin.includes(events.senderID.toString())) {
                return nayan.reply('You do not have permission to use this command.', events.threadID, events.messageID);
            }

            const deleteParams = msg.replace("delete", "").trim().split("&");
            const question = deleteParams[0].replace("ask=", "").trim();
            const answer = deleteParams[1].replace("ans=", "").trim();

            const response = await axios.get(`${apiUrl}/sim?type=delete&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
            const replyMessage = response.data.msg || response.data.data.msg;

            return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
        }
      else if (msg.startsWith("info")) {
        const response = await axios.get(`${apiUrl}/sim?type=info`);
        const totalAsk = response.data.data.totalKeys;
        const totalAns = response.data.data.totalResponses;

        return nayan.reply({ body: `Total Ask: ${totalAsk}\nTotal Answer: ${totalAns}` }, events.threadID, events.messageID);
      } 
      else if (msg.startsWith("teach")) {
        const teachParams = msg.replace("teach", "").trim().split("&");
        const question = teachParams[0].replace("ask=", "").trim();
        const answer = teachParams[1].replace("ans=", "").trim();

        const response = await axios.get(`${apiUrl}/sim?type=teach&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
        const replyMessage = response.data.msg;
        const ask = response.data.data.ask;
        const ans = response.data.data.ans;
        if (replyMessage.includes("already")){
          return nayan.reply(`ЁЯУЭYour Data Already Added To Database\n1я╕ПтГгASK: ${ask}\n2я╕ПтГгANS: ${ans}`, events.threadID, events.messageID)
        }

        return nayan.reply({ body: `ЁЯУЭYour Data Added To Database Successfully\n1я╕ПтГгASK: ${ask}\n2я╕ПтГгANS: ${ans}` }, events.threadID, events.messageID);
      }
      else if (msg.startsWith("askinfo")) {
        const question = msg.replace("askinfo", "").trim();

        if (!question) {
          return nayan.reply('Please provide a question to get information about.', events.threadID, events.messageID);
        }

        const response = await axios.get(`${apiUrl}/sim?type=keyinfo&ask=${encodeURIComponent(question)}`);
        const replyData = response.data.data;
        const answers = replyData.answers;

        if (!answers || answers.length === 0) {
          return nayan.reply(`No information available for the question: "${question}"`, events.threadID, events.messageID);
        }

        const replyMessage = `Info for "${question}":\n\n` +
          answers.map((answer, index) => `ЁЯУМ ${index + 1}. ${answer}`).join("\n") +
          `\n\nTotal answers: ${answers.length}`;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      }
      else if (msg.startsWith("help")) {
        const cmd = this.config.name;
        const prefix = global.config.PREFIX;
        const helpMessage = `
        ЁЯМЯ **Available Commands:**

        1. ЁЯдЦ ${prefix}${cmd} askinfo [question]: Get information about a specific question.

        2. ЁЯУЪ ${prefix}${cmd} teach ask=[question]&ans=[answer]: Teach the bot a new question and answer pair.

        3. тЭМ ${prefix}${cmd} delete ask=[question]&ans=[answer]: Delete a specific question and answer pair. (Admin only)

        4. ЁЯУК ${prefix}${cmd} info: Get the total number of questions and answers.

        5. ЁЯСЛ ${prefix}${cmd} hi: Send a random greeting.

        тЪб Use these commands to interact with the bot effectively!
            `;

        return nayan.reply({ body: helpMessage }, events.threadID, events.messageID);
      }
      else {
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(msg)}`);
        const replyMessage = response.data.data.msg;

        nayan.reply({ body: replyMessage }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }
    } catch (error) {
      console.log(error);
      nayan.reply('An error has occurred, please try again later.', events.threadID, events.messageID);
    }
  }
};
