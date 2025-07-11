const term = new Terminal();
const fitAddon = new FitAddon.FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();
const socket = new WebSocket('ws://' + location.host + '/term');
socket.onmessage = e => term.write(e.data);
term.onData(data => socket.send(data));
window.addEventListener('resize', () => {
  fitAddon.fit();
});