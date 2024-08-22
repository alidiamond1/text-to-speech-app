import { getVoices } from './textToSpeech.js';

export function populateVoiceList(voiceSelect, voices) {
    voiceSelect.innerHTML = ''; // Clear existing options
    voices.forEach((voice, i) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
    console.log(`Populated ${voices.length} voices`);
}