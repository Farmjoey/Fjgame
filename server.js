const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Enable trust proxy for Glitch's reverse proxy
app.enable('trust proxy');

// Store messages
const messages = [];
const MAX_MESSAGES = 100;
let messageId = 0;
let numUsers = 0;

// Add CORS headers for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});

// Error handler for JSON parsing
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ status: 'error', message: 'Invalid JSON' });
    }
    next();
});

// Serve static files
app.use(express.static('./'));
app.use(express.json());

// Socket.IO connection handling
io.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'success', message: 'Server is running' });
});

// Get messages endpoint
app.get('/messages', (req, res) => {
    try {
        const lastId = parseInt(req.query.lastId) || 0;
        const newMessages = messages.filter(msg => msg.id > lastId);
        
        res.json({
            status: 'success',
            messages: newMessages,
            lastId: messages.length > 0 ? messages[messages.length - 1].id : lastId
        });
    } catch (error) {
        console.error('Error in /messages:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Message sending endpoint
app.post('/send', (req, res) => {
    try {
        if (!req.body || !req.body.content) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Message content is required' 
            });
        }

        const message = {
            id: ++messageId,
            type: 'message',
            sender: req.body.sender || 'Anonymous',
            content: req.body.content,
            timestamp: new Date().toISOString()
        };
        
        // Store message
        messages.push(message);
        if (messages.length > MAX_MESSAGES) {
            messages.shift();
        }
        
        res.json({ 
            status: 'success',
            message: 'Message sent successfully',
            messageId: message.id
        });
    } catch (error) {
        console.error('Error in /send:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Internal server error',
            error: error.message
        });
    }
});

// User count endpoint (simplified)
app.get('/users', (req, res) => {
    try {
        res.json({
            status: 'success',
            count: 1 // Simplified count
        });
    } catch (error) {
        console.error('Error in /users:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ 
        status: 'error', 
        message: 'Not found' 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        status: 'error', 
        message: 'Internal server error',
        error: err.message
    });
});

// Start server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.log('Port is already in use. Trying again...');
        setTimeout(() => {
            server.close();
            server.listen(port);
        }, 1000);
    }
});

// Handle process termination
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server terminated');
    });
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
}); 