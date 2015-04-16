window["count"] = 0;
window["video_hash"] = {};
window["CONNECTIONS"] = 6;
window["processing_video"] = false;

function bySortedValue(obj, callback, context) {
    var tuples = [];

    for (var key in obj) tuples.push([key, obj[key]]);

    tuples.sort(function(a, b) { return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0 });

    var length = tuples.length;
    while (length--) callback.call(context, tuples[length][0], tuples[length][1]);
}

function find_server_time(){
  var http = new XMLHttpRequest();
  http.open('GET', "1.jpg");
  http.onreadystatechange = function() {
    if (this.readyState == this.DONE) {
      var time2 = time();
      var server_time = time2 - window["server_time"];
      window["server_time"] = server_time;
      log("Connected to server"+" Time taken = "+ server_time + "ms");
    }
  };
  window["server_time"] = time();
  http.send();
}
find_server_time();

function Length(url, connections)
{
  var http = new XMLHttpRequest();
  http.open('HEAD', url);
  http.onreadystatechange = function() {
    if (this.readyState == this.DONE) {
      console.log(this);
      length = this.getResponseHeader('Content-Length');
      console.log("LENGTH = "+ length);
      get_video(url, length, connections);
    }
  };
  http.send();
}

function get_video (url, length, connections) {

  var difference = Math.floor(length/connections);
  var start_point = 0;

  for (i = 1; i <= connections-1; start_point = end_point+1, i++) {
  // for (i = 1; i <= 2; start_point = end_point+1, i++) {
      end_point = start_point + difference;
      console.log("difference =" + end_point);

      // bySortedValue(window["sorted_peers"], function(key, value) {
      //     alert(key + ": " + value);
      // });

      get_part(url, start_point, end_point, i, connections);
  }
  get_part(url, start_point, length-1, i, connections);
  get_peers();
}

function get_part(url, start_index, end_index, id, connections){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",url,true);
  // console.log("LENGTTH ="+length);
  console.log("Start_part ="+start_index);
  console.log("end_part ="+end_index);
  xmlhttp.responseType = 'arraybuffer';
  xmlhttp.setRequestHeader("Range", "bytes="+start_index+"-"+end_index);

  xmlhttp.addEventListener("readystatechange", function () {
        if (xmlhttp.readyState == xmlhttp.DONE) {
            var response = new Uint8Array(xmlhttp.response)
            window["video_hash"][id] = response;
            if (id == 1)
            {
              videoSource.appendBuffer(response);
              window["processing_video"] = true;
              window.video.play();
              window["count"] = 2;
            }
            else if (window["processing_video"] == false)
            {
              if (window["count"] <= window["CONNECTIONS"] && ((window["video_hash"])[(window["count"])]) != undefined) {
                videoSource.appendBuffer(window["video_hash"][window["count"]]);
                window["processing_video"] = true;
                window["count"] += 1;
              }
            }
        }
    }, false);
    xmlhttp.send();
}

var mediaSource = new (window.MediaSource || window.WebKitMediaSource)();
window.video = document.getElementById('video');
window.video.addEventListener("error", function onError(err) {
    alert("window.video error detected:");
    console.dir(window.video.error);
    // window.video.terminate();
}); 
window.video.pause();
window.video.src = URL.createObjectURL(mediaSource);

var onMediaSourceOpen = function (e) {
    mediaSource.removeEventListener('sourceopen', onMediaSourceOpen);
    window.videoSource = mediaSource.addSourceBuffer('video/webm;codecs="vorbis,vp8"');
        videoSource.addEventListener('updateend', function() {
          console.log("COUNT = "+window["count"]);
          console.log("VALUE = "+((window["video_hash"])[(window["count"])]));
            if ((((window["video_hash"])[(window["count"])]) != undefined) && (window["count"] <= window["CONNECTIONS"])) {
                console.log("Added");
                videoSource.appendBuffer(window["video_hash"][window["count"]]);
                window["count"] += 1;
            }
          window["processing_video"] = false;
        }, false);
    injectVideoIntoBuffer();
}

mediaSource.addEventListener('sourceopen', onMediaSourceOpen);

var injectVideoIntoBuffer = function onResponse() {
    // Length("videos/79.webm", window["CONNECTIONS"]);
    Length("http://176.58.124.30:5000/images/79.webm", window["CONNECTIONS"]);
}

function check_timeout(something){
    videoSource.appendBuffer(window["response2"]);
    console.log("GOT CALLED");
    if (window["count"] == 3)
    {
        window["count"] = 0;
        // clearTimeout(window["timer"]);
        console.log("HEREEE ! adding buffer");
        videoSource.appendBuffer(window["response2"]);
    }
    else{
        console.log("here in count = "+ window["count"]);
        window["count"] += 1;
    }
}

function sleep(el) { 
    window["timer"] = setTimeout(check_timeout(el), 1000); 
}
