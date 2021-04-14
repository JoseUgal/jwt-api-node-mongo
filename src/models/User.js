import { Schema, model, } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});


// GENERAMOS MÉTODOS PERSONALIZADOS

// Creamos el método para cifrar la contraseña
// Llamando al 'static' podemos llamar al método sin necesidad de instanciar el objeto
userSchema.statics.encryptPassword = async(password) => {

    // Con 'genSalt' ejecutaremos el algoritmo tantas veces como le indiquemos.
    // Más veces = Más seguridad && Más consumo en el servidor
    const salt = await bcrypt.genSalt(10);

    // Crearemos una contraseña cifrada HASH añadiendo el salt al final y la retornamos.
    return await bcrypt.hash(password, salt);

};

// Creamos un método para comparar la contraseña
userSchema.statics.comparePassword = async(password, receivedPassword) => {

    return await bcrypt.compare(password, receivedPassword);

};


export default model('User', userSchema);