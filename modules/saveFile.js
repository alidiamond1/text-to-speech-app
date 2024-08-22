export function saveToFile(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'speech_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
