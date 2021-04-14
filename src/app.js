import express from 'express';
import morgan from 'morgan';

// Leeremos el archivo de package.json
import pkg from "../package.json";

// Libreria
import { createRoles } from './libs/initialSetup';

//  Rutas
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// Creamos los roles por defecto
createRoles();

// Guardamos pkg en una variable de express
app.set("pkg", pkg);

// Le diremos a express que utilice el modulo de morgan para dar
// informacón por pantalla de las respuestas-peticiones
app.use(morgan('dev'));

// Aplicamos al servidor el modulo para leer JSON
app.use(express.json());

// Ofrecemos información de la aplicación en la ruta principal
app.get('/', (req, res) => {

    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });

});

// Usamos las rutas
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

export default app;