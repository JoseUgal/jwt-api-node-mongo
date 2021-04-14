import jwt from 'jsonwebtoken';
import config from '../config';

export const verifyToken = async(req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    const decodedToken = jwt.verify(token, config.SECRET);
    console.log(decodedToken);

    //next();
};