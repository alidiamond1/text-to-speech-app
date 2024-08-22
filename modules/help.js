export function showHelp() {
    const helpText = `
        <h2>Text to Speech App Help</h2>
        <ul>
            <li>Enter your text in the textarea.</li>
            <li>Select a voice from the dropdown menu.</li>
            <li>Adjust the speech rate using the slider.</li>
            <li>Click "Speak" to hear the text spoken.</li>
            <li>Click "Save to File" to download the text as a file.</li>
        </ul>
    `;
    
    const helpModal = document.createElement('div');
    helpModal.className = 'modal';
    helpModal.innerHTML = `
        <div class="modal-content">
            ${helpText}
            <button id="closeHelp">Close</button>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    document.getElementById('closeHelp').onclick = () => {
        document.body.removeChild(helpModal);
    };
}
