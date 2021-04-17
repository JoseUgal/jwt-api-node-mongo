import User from "../models/User"
import Role from "../models/Role";

export const isModerator = async (req, res, next) => {

    const user = await User.findById(req.userId, {password: 0});
    
    // Buscamos todos los roles que sean iguales a los del usuario
    const roles = await Role.find({_id: {$in: user.roles}});

    for( let role of roles ){
        if( role.name === "moderator" ){
            next();
            return;
        };
    }

    return res.status(403).json({ message: 'Moderator role is needed' });
    

}

export const isAdmin = async (req, res, next) => {

    const user = await User.findById(req.userId, {password: 0});
    
    // Buscamos todos los roles que sean iguales a los del usuario
    const roles = await Role.find({_id: {$in: user.roles}});

    for( let role of roles ){
        if( role.name === "admin" ){
            next();
            return;
        };
    }

    return res.status(403).json({ message: 'Admin role is needed' });

}