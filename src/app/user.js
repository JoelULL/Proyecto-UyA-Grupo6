const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema ({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true}
});

/**
 * Funcion que permite guardar un password para los usuarios
 * de la base de datos.
 */
userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password') ) {
        const document = this;

        //permite crear un hash para encriptar la contraseña
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if(err)
                next(err);
            else {
                document.password = hashedPassword;
                next();
            }    
        }); 
    } else {
        next();
    }
});

/**
 * Funcion que permitira comparar la contraseña del usuario
 * con la que esta en la base de datos para comprobar las 
 * credenciales y poder iniciar sesion
 */
userSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.function, function(err, same) {
        if(err) {
            callback(err);
        }
        else {
            callback(err, same);
        }

    });
}

// exportamos al usuario para poder manejar sus datos en este caso
// en app.js
module.exports = mongoose.model('User', userSchema);