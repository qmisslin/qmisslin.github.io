let Vocal = {

    initWave : () => {

        let doDraw = (analyser, frequencyArray) => {
            analyser.getByteFrequencyData(frequencyArray);
            
            sum = frequencyArray.reduce(function(a, b) { return a + b; });
            s = Math.max(20, Math.min(Math.floor(sum / frequencyArray.length), 100));
            Page.setWaveSize(s);
            requestAnimationFrame(() => doDraw(analyser, frequencyArray));
        }

        let soundAllowed = (stream) => {
            var audioContent = new AudioContext();
            var audioStream = audioContent.createMediaStreamSource( stream );
            var analyser = audioContent.createAnalyser();
            audioStream.connect(analyser);
            analyser.fftSize = 1024;

            var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

            doDraw(analyser, frequencyArray);
        }
        let soundNotAllowed = () => {
            console.log("Wait sound allowed...");
        }

        window.navigator = window.navigator || {};
        navigator.getUserMedia =  navigator.getUserMedia   ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia    ||
                              null;
        navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);
    },

    initRec : () => {

        // Initialize vocal
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        let grammar = '#JSGF V1.0;';
        let speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);

        let rec = new SpeechRecognition();
        rec.grammars = speechRecognitionList;
        rec.lang = 'fr-FR';
        rec.interimResults = false;
        rec.continuous = true;

        rec.start();

        // Vocal event manage
        rec.onresult = function(event) {
            var last = event.results.length - 1;
            var command = event.results[last][0].transcript.toLowerCase();
            command = command.replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
            Page.sendMessage(command);
        };
        rec.onspeechend = function() {
            Vocal.initRec();
        };
        rec.onerror = function(event) {
            if(event.isTrusted) return;
            Page.receiveMessage("Je n'ai pas bien compris");
            console.log('Error occurred in speach recognition: ' + event.error);
            Vocal.initRec();
        }
    },

    start : () => {
        Vocal.initWave();
        Vocal.initRec();
    },

    restart : () => {
        Page.clear();
        Vocal.start();
    }
}
