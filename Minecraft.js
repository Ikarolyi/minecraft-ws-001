const WebSocket = require('ws');
const express = require('express')


const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

  const { Server } = require('ws');

const wss = new Server({ server });

const events = new Array("AgentCommand","AgentCreated","PlayerMessage");
console.log("You can use \"#\" control agent.");
wss.on('connection', function connection(ws) {
	for (var c = 0 ; c < events.length ; c++){
		ws.send(JSON.stringify({
            "body": {
                "eventName": events[c]
            },
            "header": {
                "requestId": "0ffae098-00ff-ffff-abbbbbbbbbdf3344",
                "messagePurpose": "subscribe",
                "version": 1,
                "messageType": "commandRequest"
            }}));
	}
	function command(cmd){
		ws.send(JSON.stringify({
            "body": {
                "origin": {
                    "type": "player"
                },
                "commandLine": cmd,
                "version": 1
            },
            "header": {
                "requestId": "add538f2-94c1-422b-8334-41fa5e8778c9",
                "messagePurpose": "commandRequest",
                "version": 1,
                "messageType": "commandRequest"
            }
        }));
	}
	ws.on("message", function incoming(message) {
		if (JSON.parse(message).body.eventName == "PlayerMessage") {
      console.log("Chat Writed.")
            var agent_command = JSON.parse(message).body.properties.Message;
            console.log("\"" + agent_command + "\"")
            if (agent_command.substring(0, 1) == "[") {
                command(agent_command.substring(5, agent_command.length));
            }}
  });
});