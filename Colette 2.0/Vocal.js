let Vocal = {

    rec_is_off : true,

    initWave : () => {

        let doDraw = (analyser, frequencyArray) => {
            analyser.getByteFrequencyData(frequencyArray);
            
            sum = frequencyArray.reduce(function(a, b) { return a + b; });
            s = Math.max(20, Math.min(20+0.1*Math.floor(sum / frequencyArray.length), 30));
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
            Page.receiveMessage("Oups, j'ai eu un petit soucis dans mon processus, mais c'est bon ça va mieux !");
            console.log('VOCAL - Error occurred in speach recognition: ' + event.error);
            Vocal.initRec();
        };
        rec.onnomatch = function(event) {
            rep = [
                "Je n'ai pas bien compris...",
                "Je ne comprends pas bien ce que vous dites...",
                "Je n'ai pas bien entendu...",
                "Pouvez vous reformuler s'il vous plaît ? Je n'ai pas bien compris...",
            ];
            console.log("VOCAL - No matching recognition.");

            Page.receiveMessage(rep[Math.floor(Math.random()*rep.length)]);
        };
        rec.onsoundstart = function(event) {
            console.log("VOCAL - Service work.");
            Page.vocalIsPaused(false);
            Vocal.rec_is_off = false;
        }
        rec.onsoundend = function(event) {
            console.log("VOCAL - Service are paused.");
            Page.vocalIsPaused(true);
            Vocal.rec_is_off = true;
            Vocal.forcingStart();
        }
    },

    start : () => {
        console.log("VOCAL - Try to start service.");
        Vocal.initWave();
        Vocal.initRec();
    },

    restart : () => {
        Page.clear();
        Vocal.start();
    },

    forcingStart : () => {        
        setTimeout(() => {
            if(Vocal.rec_is_off) {
                Vocal.start();
                Vocal.forcingStart();
            }
        }, 3000);
    },
}
