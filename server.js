const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Importez le modèle User
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://yusikiyuki:mimikoko155@squadchat.hzdjq2f.mongodb.net/?retryWrites=true&w=majority&appName=SquadChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.log('Erreur de connexion à MongoDB', err));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'inscription : ' + err });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
      res.status(200).json({ message: 'Connexion réussie ! Bienvenue, ' + username });
    } else {
      res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

io.on('connection', (socket) => {
  console.log(`Utilisateur connecté : ${socket.id}`);

  Message.find().sort({ timestamp: 1 }).limit(50).then(messages => {
    socket.emit('chat-history', messages);
  });

  socket.on('set-username', (username) => {
    socket.username = username;
  });

  socket.on('chat-message', (data) => {
    const newMessage = new Message({ username: data.username, message: data.message });
    newMessage.save().then((savedMessage) => {
      io.emit('chat-message', { ...savedMessage.toObject(), _id: savedMessage._id });
    }).catch(err => console.log('Erreur lors de l\'enregistrement du message', err));
  });

  socket.on('delete-message', (messageId) => {
    if (socket.username === 'admin') {
      Message.deleteOne({ _id: messageId }).then(() => {
        io.emit('delete-message', messageId);
      }).catch(err => console.log('Erreur lors de la suppression du message', err));
    }
  });

  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté : ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
