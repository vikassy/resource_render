var random_id = Math.floor((Math.random() * 10000) + 1);
var peer_name = "client"+random_id
var peer = new Peer(peer_name, {host: window.location.href.split('/')[2].split(':')[0], port: 8000, path: '/',debug: 3, key: 'peerjs'});

peer.on('open', function(id) {
		console.log('My peer ID is: ' + id);
		$("#client").html(id);
	});
	peer.on('connection', function(conn) { 
		console.log(conn);
		conn.on('open', function() {
			console.log("OPEENEDDD from client");
			// if (confirm("Allow someone to share your data?")){
			if (true){
			  // Receive messages
			  conn.on('data', function(data) {
			  	// console.log("SOME DATA PLEASE!!");
			    console.log('Received');
			    console.log(data);
			    if (data == "send_test"){
			    	conn.send({"control": "test","data": new Uint8Array(1024)});
			    	log("Sending to "+ conn.peer);
			    }
			  });
		  }
		});
	});

function get_peers() {
	console.log("Get peers");
	$.ajax({
	  url: "clients.php",
	}).done(function(data) {
	    window["peers"] = JSON.parse(data);
	    connect_to_peers();
  	});
}

function log(message)
{
	$("#log").append(message+"<br />");
}

function connect_to_peers(){
	var peers = window["peers"];
	var length = peers.length
	var i=0;
	while(i < length){
		if (peers[i] != peer_name)
		{
			window[peers[i]] = new Client(peers[i]);
			window[peers[i]].connect();
		}
		i += 1;
	}
}

function get_peer_content() {
	get_peers();
}