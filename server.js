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

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose.connect('mongodb+srv://yusikiyuki:mimikoko155@squadchat.hzdjq2f.mongodb.net/?retryWrites=true&w=majority&appName=SquadChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Délai d'attente de 30 secondes
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.log('Erreur de connexion à MongoDB', err));

// Endpoint pour gérer l'inscription des utilisateurs
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Ce pseudo est déjà pris.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'inscription : ' + err.message });
  }
});

// Endpoint pour gérer la connexion des utilisateurs
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion : ' + err.message });
  }
});

// Lorsqu'un utilisateur se connecte
io.on('connection', (socket) => {
  console.log(`Utilisateur connecté : ${socket.id}`);

  // Envoyer l'historique des messages au nouvel utilisateur
  Message.find().sort({ timestamp: 1 }).limit(50).then(messages => {
    socket.emit('chat-history', messages);  // Envoi de l'historique des messages
  }).catch(err => {
    console.log('Erreur lors de la récupération des messages', err);
    socket.emit('chat-history', []);  // Envoi d'un tableau vide en cas d'erreur
  });

  // Gestion des messages du chat
  socket.on('chat-message', (data) => {
    const newMessage = new Message({ username: data.username, message: data.message });

    newMessage.save()
      .then((savedMessage) => {
        io.emit('chat-message', { ...savedMessage.toObject(), _id: savedMessage._id });
      })
      .catch(err => {
        console.log('Erreur lors de l\'enregistrement du message', err);
      });
  });

  // Lors de la déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté : ${socket.id}`);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
