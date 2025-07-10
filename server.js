const express = require('express');
const expressWs = require('express-ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
expressWs(app);

app.use(express.static(path.join(__dirname, 'public')));

app.ws('/term', (ws, req) => {
  const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.on('data', data => ws.send(data));
  ws.on('message', msg => ptyProcess.write(msg));
  ws.on('close', () => ptyProcess.kill());
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`));
