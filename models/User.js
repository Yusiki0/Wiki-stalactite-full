// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Création du modèle
const User = mongoose.model('User', userSchema);

module.exports = User;
