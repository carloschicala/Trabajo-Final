import express, {Application} from 'express';
import cors from 'cors';
import routesProduct from '../routes/product';
import routesUser from '../routes/user';
import { Product } from './product';
import { User } from './user';

class Server {
    private app: Application;
    private port: string | undefined ;
    //
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
        //console.log(process);
        console.log(process.env.PORT)
//
        //console.log('estoy en el constructor')
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto: ' + this.port);
        })

    }

    routes() {
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
    } 

    midlewares() {
        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Product.sync();
            await User.sync(); 
            console.log('Connection has been established successfully');
        } catch (error) {
            console.error('unable to connect to the database', error);
        }
    }
}

export default Server; //