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

// Connexion à MongoDB
mongoose.connect('mongodb+srv://yusikiyuki:mimikoko155@squadchat.hzdjq2f.mongodb.net/?retryWrites=true&w=majority&appName=SquadChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.log('Erreur de connexion à MongoDB', err));

// Endpoint pour gérer l'inscription des utilisateurs
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Ce pseudo est déjà pris.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    // Sauvegarder l'utilisateur
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
    // Chercher l'utilisateur dans la base de données
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion : ' + err.message });
  }
});

// Gestion des connexions socket.io
io.on('connection', (socket) => {
  console.log(`Utilisateur connecté : ${socket.id}`);

  // Envoyer l'historique des messages au nouvel utilisateur
  Message.find().sort({ timestamp: 1 }).limit(50).then(messages => {
    socket.emit('chat-history', messages);  // Envoi de l'historique des messages
  }).catch(err => {
    console.log('Erreur lors de la récupération des messages', err);
    socket.emit('chat-history', []);  // Envoi d'un tableau vide en cas d'erreur
  });

  // Réception du nom d'utilisateur et l'assigner à la session de l'utilisateur
  socket.on('set-username', (username) => {
    socket.username = username;
    console.log(`Nom d'utilisateur défini : ${username}`);
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

  // Gestion de la suppression des messages (uniquement pour l'admin)
  socket.on('delete-message', (messageId) => {
    if (socket.username === 'admin') {
      Message.deleteOne({ _id: messageId })
        .then(() => {
          io.emit('delete-message', messageId);
        })
        .catch(err => {
          console.log('Erreur lors de la suppression du message', err);
        });
    }
  });

  // Lors de la déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté : ${socket.id}`);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
