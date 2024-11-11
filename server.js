const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Initialisation de l'application et du serveur HTTP
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware pour autoriser les requêtes CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration pour servir les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose.connect('mongodb+srv://yusikiyuki:mimikoko155@squadchat.hzdjq2f.mongodb.net/?retryWrites=true&w=majority&appName=SquadChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.log('Erreur de connexion à MongoDB', err));

// Création des modèles pour les utilisateurs et les messages
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);

// Route par défaut pour vérifier si le serveur fonctionne
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint pour gérer l'inscription des utilisateurs
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'Inscription réussie !' });
  } catch (err) {
    res.status(400).send({ message: 'Erreur lors de l\'inscription : ' + err });
  }
});

// Endpoint pour gérer la connexion des utilisateurs
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).send({ message: 'Connexion réussie !' });
  } else {
    res.status(400).send({ message: 'Pseudo ou mot de passe incorrect.' });
  }
});

// Connexion des sockets
io.on('connection', (socket) => {
  console.log(`Utilisateur connecté : ${socket.id}`);

  // Envoyer l'historique des messages au nouvel utilisateur
  Message.find().sort({ timestamp: 1 }).limit(50).then(messages => {
    socket.emit('chat-history', messages);
  });

  // Réception de l'identifiant de l'utilisateur
  socket.on('set-username', (username) => {
    socket.username = username;
  });

  // Gestion de l'envoi des messages
  socket.on('chat-message', (data) => {
    const newMessage = new Message({ username: data.username, message: data.message });
    newMessage.save().then((savedMessage) => {
      io.emit('chat-message', { ...savedMessage.toObject(), _id: savedMessage._id });
    }).catch(err => console.log('Erreur lors de l\'enregistrement du message', err));
  });

  // Gestion de la suppression des messages par l'utilisateur admin
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

// Lancer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
