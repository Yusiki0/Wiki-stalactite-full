const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// Initialisation de l'application et du serveur HTTP
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Autoriser toutes les origines
    methods: ['GET', 'POST']
  }
});

// Middleware pour autoriser les requêtes CORS
app.use(cors());

// Configuration pour servir les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose.connect('mongodb+srv://yusikiyuki:mimikoko155@squadchat.hzdjq2f.mongodb.net/?retryWrites=true&w=majority&appName=SquadChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.log('Erreur de connexion à MongoDB', err));

// Création d'un modèle pour les messages
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Route par défaut pour vérifier si le serveur fonctionne
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connexion des sockets
io.on('connection', (socket) => {
  console.log(`Utilisateur connecté : ${socket.id}`);

  // Envoyer l'historique des messages au nouvel utilisateur
  Message.find().sort({ timestamp: 1 }).limit(50).then(messages => {
    socket.emit('chat-history', messages);
  });

  // Réception du pseudo
  socket.on('set-username', (username) => {
    socket.username = username;  // Sauvegarder le pseudo
  });

  // Réception d'un message de chat
  socket.on('chat-message', (data) => {
    const newMessage = new Message({
      username: data.username,
      message: data.message
    });

    // Enregistrer le message dans MongoDB
    newMessage.save()
      .then(() => {
        // Diffuser le message à tous les utilisateurs
        io.emit('chat-message', data);
      })
      .catch(err => console.log('Erreur lors de l\'enregistrement du message', err));
  });

  // Réception de la demande de suppression de message
  socket.on('delete-message', (messageId) => {
    // Vérifier si l'utilisateur est un administrateur (par exemple, si le pseudo est "admin")
    if (socket.username === 'admin') {
      // Supprimer le message de MongoDB
      Message.deleteOne({ _id: messageId })
        .then(() => {
          // Diffuser l'événement de suppression à tous les clients
          io.emit('delete-message', messageId);
          console.log(`Message avec ID ${messageId} supprimé`);
        })
        .catch(err => console.log('Erreur lors de la suppression du message', err));
    } else {
      console.log('Tentative de suppression par un utilisateur non autorisé');
    }
  });

  // Déconnexion de l'utilisateur
  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté : ${socket.id}`);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
