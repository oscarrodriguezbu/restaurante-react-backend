const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },  
    email: {
        type: String,
        unique: true,
        trim: true,
    },    
    password: {
        type: String,
        required: true,
        trim: true
    },
    profile_img_url: String,
    profile_img_public_id: String

},
    {
        timestamps: true, //añade fecha de creacion y modificacion
        versionKey: false //quita el __v de mongodb
    }
);

module.exports = model('Usuario', UsuarioSchema);