var redis = require('redis');
var prompt = require('prompt');
var sub = redis.createClient();
var pub = redis.createClient();
var messageSent;

prompt.start();
function getMessage(){
	prompt.get(['messages'], function(err, result){
		if(err){return onErr(err);}

		messageSent = result.messages;
		
		pub.publish("channel", messageSent);
		
		
		getMessage();
	})
}

sub.on("message", function (channel, message){
	console.log(message);
});

sub.subscribe("channel");
getMessage();