import User from '../models/User';
import jwt from 'jsonwebtoken';

import config from '../config';
import Role from '../models/Role';

export const signUp = async(req, res) => {
    const { username, email, password, roles } = req.body;


    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles) {
        const foundRole = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRole.map(role => role._id);
    } else {
        const role = await Role.findOne({ name: 'user' });
        newUser.roles = [role._id];
    }

    // Guardamos el usuario para comenzar a generar el token
    const savedUser = await newUser.save();

    console.log(savedUser);

    // Creamos el token
    // El token recibe => Dato a guardar en el token, palabra secreta para generrlo 
    // y objeto de configuración
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 // 24h en segundos
    })

    res.status(200).json({ token });
};

export const signIn = async(req, res) => {
    // res.json({ message: 'signIn' });

    const { email, password } = req.body;

    const userFound = await User.findOne({ email }).populate("roles");

    if (!userFound) return res.status(400).json({ message: 'User not found' });

    const matchedPassword = await User.comparePassword(password, userFound.password);

    if (!matchedPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

    // Si la contraseña coincide generamos el TOKEN
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json({ token });

};