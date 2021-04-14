import Role from '../models/Role';

export const createRoles = async() => {

    try {
        // Almacenamos la cantidad de roles que dispone nuestra BBDD
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        // Llegados a este punto, debemos generar los roles
        // por defecto.

        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()
        ])

        console.log(values);
    } catch (error) {
        console.log(error);
    }

};