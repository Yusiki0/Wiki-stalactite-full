const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Importez le modèle User
const Message = require('./models/Message'); // Importez le modèle Message

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose.connect('mongodb+srv://yusikiyuki:mimikoko155@squadchat.hzdjq2f.mongodb.net/?retryWrites=true&w=majority&appName=SquadChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.log('Erreur de connexion à MongoDB', err));

// Endpoint pour l'inscription
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Ce pseudo est déjà pris.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'inscription : ' + err.message });
  }
});

// Endpoint pour la connexion
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });

    res.status(200).json({ message: 'Connexion réussie !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion : ' + err.message });
  }
});

// Gestion des connexions et du chat
io.on('connection', (socket) => {
  console.log(`Utilisateur connecté : ${socket.id}`);

  // Envoyer l'historique des messages au nouvel utilisateur
  Message.find().sort({ timestamp: 1 }).limit(50) // Tri par timestamp croissant
    .then(messages => {
      socket.emit('chat-history', messages);
    })
    .catch(err => {
      console.log('Erreur lors de la récupération des messages', err);
      socket.emit('chat-history', []);
    });

  // Gestion des messages du chat
  socket.on('chat-message', (data) => {
    const newMessage = new Message({ username: data.username, message: data.message, timestamp: new Date() });

    newMessage.save()
      .then((savedMessage) => {
        io.emit('chat-message', { username: savedMessage.username, message: savedMessage.message });
      })
      .catch(err => {
        console.log('Erreur lors de l\'enregistrement du message', err);
      });
  });

  // Lors de la déconnexion
  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté : ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
