let synth = window.speechSynthesis;
let voices = [];
let currentUtterance = null;
let voicesLoaded = false;

function loadVoices() {
    return new Promise((resolve) => {
        const loadVoicesAttempt = () => {
            voices = synth.getVoices();
            if (voices.length > 0) {
                voicesLoaded = true;
                resolve(voices);
            } else {
                setTimeout(loadVoicesAttempt, 10);
            }
        };

        loadVoicesAttempt();

        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoicesAttempt;
        }
    });
}

export async function speak(text, voiceName, rate) {
    console.log('Speak function called:', { text, voiceName, rate });
    
    if (!voicesLoaded) {
        await loadVoices();
    }

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        synth.cancel(); // Cancel any ongoing speech
    }
    
    if (text !== '') {
        const utterThis = new SpeechSynthesisUtterance(text);
        currentUtterance = utterThis;  // Store the current utterance

        utterThis.onstart = function (event) {
            console.log('SpeechSynthesisUtterance.onstart');
        }
        utterThis.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
            currentUtterance = null;  // Clear the current utterance
        }
        utterThis.onerror = function (event) {
            console.error('SpeechSynthesisUtterance.onerror', event);
            currentUtterance = null;  // Clear the current utterance
        }
        
        console.log('Available voices:', voices.map(v => v.name));
        
        const selectedVoice = voices.find(v => v.name === voiceName);
        if (selectedVoice) {
            utterThis.voice = selectedVoice;
            console.log('Selected voice:', selectedVoice.name);
        } else {
            console.warn('Selected voice not found, using default');
        }
        
        utterThis.pitch = 1;
        utterThis.rate = rate;
        
        console.log('Speaking now...');
        synth.speak(utterThis);

        // Keep the speech going
        const keepAlive = setInterval(() => {
            if (!synth.speaking) {
                clearInterval(keepAlive);
            } else {
                synth.pause();
                synth.resume();
            }
        }, 14000);
    } else {
        console.warn('No text to speak');
    }
}

export async function getVoices() {
    if (!voicesLoaded) {
        await loadVoices();
    }
    return voices;
}

export function stopSpeaking() {
    if (synth.speaking) {
        synth.cancel();
    }
}