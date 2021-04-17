import User from '../models/User';

export const getUser = async (req, res) => {

    const users = await User.find();
    return res.json( users );

}

export const createUser = async (req, res) => {
    return res.json({message: 'creating user'});
}
