require('dotenv').config();
const express = require('express');
const path = require('path');
const os = require('os');

const db = require('./db')
const todo = require('./todo');

// get config from environment variable
SERVER_PORT_NUMBER = parseInt(process.env.SERVER_PORT_NUMBER) || 3000;
HOST_NAME = process.env.HOST_NAME || 'localhost'

const app = express()

app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname, 'static')))

let connectionStatus = false;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'html', 'index.html'))
});

app.get('/info', (req, res) => {
  const cpus = os.cpus();

  res.json({
    connectionStatus,
    os_arch: os.arch(),
    os_type: os.type(),
    os_total_mem: os.totalmem(),
    os_cpu_nums: cpus.length,
    os_cpu_model: cpus[0].model
  });
})

app.get('/todo', async (req, res) => {
    const rows = await todo.getTODOs();
    if (!rows) {
      res.status(400);
      return
    }
    res.json({ rows });
});

app.post('/todo', async (req, res) => {
  const { title, content } = req.body;

    const id = await todo.createTODO(title, content);
    if (!id) {
      res.status(400);
      return
    } 
    res.json({ id: id.id });
});

app.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const r = await todo.deleteTODO(id);
  if (!r) {
    res.status(400);
    return;
  } 
  res.json({ message: 'ok' });
});

app.listen(SERVER_PORT_NUMBER, async () => {
  connectionStatus = await db.connect();
  console.log(`Server is listening at http://${HOST_NAME}:${SERVER_PORT_NUMBER}`)
});
