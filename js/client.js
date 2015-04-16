window["sorted_peers"] = {};

function time () {
	var d = new Date();
	return d
}

Client = function(id){
	console.log("ID IS");
	console.log(id);
	this.client_id = id;
}

Client.prototype.connect = function() {
	console.log("Connecting ----> "+this.client_id);
	console.log(this.client_id);

	this.connection = peer.connect(this.client_id);

	console.log("Connection in next line:");
	console.log(this.connection);

	this.connection.on('open', function() {
		console.log(this);
		console.log("igurifdghiufhgiufhiuhrg");
		console.log("SOMETHING: --");
		console.log(this.client_id);

		this.start_time = time();
		console.log("Start time for "+this.client_id+" is = "+ this.start_time);
		this.send("send_test");

	  	// Receive messages
		this.connection.on('data', function(data) {
	  		console.log(data);

	  		this.handle_reply(data);

	  	}.bind(this));
	}.bind(this));
}

Client.prototype.handle_reply = function(data) {
	if (data.control == "test"){
  		this.reply_rate(data);
  	}
}

Client.prototype.reply_rate = function(data) {
	this.end_time = time();
	console.log("End time for "+this.client_id+" is = "+ this.end_time);
	var time_taken = this.end_time - this.start_time
	if (time_taken <= window["server_time"]){
		console.log("Timings = ===");
		console.log(time_taken);
		console.log(window["server_time"]);
		(window["sorted_peers"])[this.client_id] = time_taken;
	}
	// if((now - window["time_"+connection.peer]) > 0)
	log("Connected to "+ this.client_id +"; Time taken = "+ (this.end_time - this.start_time) + "ms");
	// connection.send({"control": "data", "count": window["count"]})
}

Client.prototype.send = function(object) {
	console.log("Sending ...");
	console.log(object);
	this.connection.send(object);
	// log("Sending data to"+this.client_id);
}