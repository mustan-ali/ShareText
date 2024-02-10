const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

let sharedText = ''

io.on('connection', (socket) => {

    socket.emit('updateText', sharedText)

    socket.on('updateText', (text) => {
        sharedText = text
        io.emit('updateText', sharedText)
    })

    socket.on('clearText', () => {
        sharedText = ''
        io.emit('updateText', sharedText)
    })
})


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
