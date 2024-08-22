export function getText() {
    return document.getElementById('inputText').value;
}

export function setText(text) {
    document.getElementById('inputText').value = text;
}

export function appendOutput(text) {
    const outputArea = document.getElementById('outputArea');
    const p = document.createElement('p');
    p.textContent = text;
    outputArea.appendChild(p);
}

export function clearOutput() {
    document.getElementById('outputArea').innerHTML = '';
}
