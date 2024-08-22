const defaultSettings = {
    defaultVoice: '',
    defaultRate: 1,
    darkMode: false
};

export function saveSettings(settings) {
    localStorage.setItem('ttsSettings', JSON.stringify(settings));
}

export function loadSettings() {
    const savedSettings = localStorage.getItem('ttsSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
}

export function applySettings(settings) {
    if (settings.defaultVoice) {
        document.getElementById('voiceSelect').value = settings.defaultVoice;
    }
    document.getElementById('rateRange').value = settings.defaultRate;
    document.body.classList.toggle('dark-mode', settings.darkMode);
}
