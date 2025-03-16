
importScripts("demuxer_mp4.js","processFrame.js");


let id = '';
// Status UI. Messages are batched per animation frame.

let renderbatch = 0;
function sendMessage(kind, message) {
	if(kind=="render"){//no need to send render message every frame, only update infrequently
		renderbatch+=1;
		if(renderbatch<50){ return; }
		renderbatch = 0;
	}
	 self.postMessage({
		 id,
		 kind,
		message
	});
}


let startTime = null;
let frameCount = 0;


// Startup.
function start(message) {	
	videoScale = message.scale;
	hashLength= message.hashSize;
	hashKind = message.hashKind;
	if(hashKind == 'phash'){
		hashFunc = phash;
	}
	if(hashKind == 'ahash'){
		hashFunc = ahash;
	}
	if(hashKind == 'dhash'){
		hashFunc = dhash;
	}
	

	id = message.id;
  // Set up a VideoDecoder.
  const decoder = new VideoDecoder({
    output(frame) {
      // Update statistics.
      if (startTime == null) {
        startTime = performance.now();
      } else {
        const elapsed = (performance.now() - startTime) / 1000;
        const fps = ++frameCount / elapsed;
        sendMessage("render", `${fps.toFixed(0)} fps`);
      }

	processFrame(frame);

		progress = frame.timestamp;
      // Schedule the frame to be rendered.
	  if(decoder.decodeQueueSize <1){
		  sendMessage('finish','finish');

	  }
	  frame.close();
    },
    error(e) {
      sendMessage("decode", e);
    }
  });

  // Fetch and demux the media data.
  const demuxer = new MP4Demuxer(message.dataUri, {
    onConfig(config) {
      sendMessage("decode", `${config.codec} @ ${config.codedWidth}x${config.codedHeight}`);
      decoder.configure(config);
    },
    onChunk(chunk) {
      decoder.decode(chunk);
    },
    setStatus:sendMessage
  });
}

// Listen for the start request.
self.addEventListener("message", message => start(message.data));
