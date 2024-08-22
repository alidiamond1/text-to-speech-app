import { speak, getVoices, stopSpeaking } from './modules/textToSpeech.js';
import { populateVoiceList } from './modules/voiceSelection.js';
import { setSpeechRate, getSpeechRate } from './modules/speechRate.js';
import { saveToFile } from './modules/saveFile.js';
import { getText, setText, appendOutput, clearOutput } from './modules/textIO.js';
import { saveSettings, loadSettings, applySettings } from './modules/settings.js';
import { showHelp } from './modules/help.js';

document.addEventListener('DOMContentLoaded', () => {
    const voiceSelect = document.getElementById('voiceSelect');
    const rateRange = document.getElementById('rateRange');
    const rateValue = document.getElementById('rateValue');
    const speakButton = document.getElementById('speakButton');
    const stopButton = document.getElementById('stopButton');
    const saveButton = document.getElementById('saveButton');
    const settingsButton = document.getElementById('settingsButton');
    const inputText = document.getElementById('inputText');

    if (!voiceSelect || !rateRange || !rateValue || !speakButton || !stopButton || !saveButton || !settingsButton || !inputText) {
        console.error('One or more required elements are missing from the DOM');
        return;
    }

    speakButton.disabled = true;

    let settings = loadSettings();
    applySettings(settings);

    function initializeVoices() {
        getVoices().then(voices => {
            populateVoiceList(voiceSelect, voices);
            console.log('Voice list populated');
            speakButton.disabled = false;
            if (settings.defaultVoice) {
                voiceSelect.value = settings.defaultVoice;
            }
        }).catch(error => {
            console.error('Error loading voices:', error);
            appendOutput('Error loading voices. Please refresh the page.');
        });
    }

    initializeVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = initializeVoices;
    }

    rateRange.addEventListener('input', () => {
        const rate = rateRange.value;
        rateValue.textContent = `${rate}x`;
        setSpeechRate(rate);
        settings.defaultRate = parseFloat(rate);
        saveSettings(settings);
    });

    speakButton.addEventListener('click', async () => {
        const text = getText();
        const voice = voiceSelect.value;
        const rate = getSpeechRate();
        console.log('Speak button clicked:', { text, voice, rate });
        
        try {
            await speak(text, voice, rate);
            appendOutput(`Speaking: "${text}" (Voice: ${voice}, Rate: ${rate})`);
        } catch (error) {
            console.error('Error in speak function:', error);
            appendOutput(`Error speaking: ${error.message}`);
        }
    });

    stopButton.addEventListener('click', () => {
        stopSpeaking();
        appendOutput('Speech stopped');
    });

    saveButton.addEventListener('click', () => {
        const text = getText();
        saveToFile(text);
        appendOutput('Text saved to file');
    });

    settingsButton.addEventListener('click', () => {
        settings.defaultVoice = voiceSelect.value;
        settings.defaultRate = parseFloat(rateRange.value);
        settings.darkMode = !settings.darkMode;
        saveSettings(settings);
        applySettings(settings);
        appendOutput(`Settings updated and saved.`);
    });

    voiceSelect.addEventListener('change', () => {
        settings.defaultVoice = voiceSelect.value;
        saveSettings(settings);
    });
});