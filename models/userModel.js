const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

// create user model
const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: [true, "Le pseudo est requis"],
        unique: [true, "Déjà prit ! veuillez selectionner un autre pseudo"],
        max: 32,
        min: 4
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: [true, "Cet email est déjà enregistré"],
        lowercase: true,
        validate: [validator.isEmail, "Entrez un email valide"]
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        minLength: 8,
        select: false
    }
})

// pre-save middleware on createUser for hash the password
userSchema.pre('save', async function(next) {
    // running if password was modified
    !this.isModified('password') && next();

    // hash password with 12 salting
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

// method called in login function for compare the passwords
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
