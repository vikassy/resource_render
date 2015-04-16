var random_id = Math.floor((Math.random() * 10000) + 1);
var peer_name = "client"+random_id
var peer = new Peer(peer_name, {host: '127.0.0.1', port: 8000, path: '/',debug: 3});

peer.on('open', function(id) {
		console.log('My peer ID is: ' + id);
	});
	peer.on('connection', function(conn) { 
		console.log(conn);
		conn.on('open', function() {
			console.log("OPEENEDDD");
			if (confirm("Allow someone to share your data?")){
			  // Receive messages
			  conn.on('data', function(data) {
			  	console.log("SOME DATA PLEASE!!");
			    console.log('Received', data);
			    if (data == "send_tweets"){
			    	console.log("TRUEEEE!");
			    	twitter_data = window.localStorage.getItem('tweets');
			    	console.log(twitter_data);
			    	window["senderr"] = conn;
			    	conn.send(twitter_data);
			    }
			  });
		  }
		});
	});

function get_peers () {
	$.ajax({
  url: "/peers",
  }).done(function(data) {
    window["peers"] = data;
    connect_to_peers();
  });
}

function connect_to_peers(){
	var peers = window["peers"]
	var length = peers.length
	var i=0;
	console.log("HEWRREEE");
	while(i < length){
		if (peers[i] != peer_name)
		{
			console.log("Connecting "+peers[i]);
			connection = peer.connect(peers[i])

			connection.on('open', function() {
				console.log("OPEENEDDD");
			  // Receive messages
			  connection.on('data', function(data) {
			    // console.log('Received', data);
			    conver_tweets(JSON.parse(data));
			  });

			  // Send messages
			  connection.send('send_tweets');
			});
			// connection.send("send_tweets");
		}
		i += 1;
	}
}

function get_peer_content() {
	get_peers();
}