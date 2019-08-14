// CORE
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as graphqlHTTP from "express-graphql";
import schema from './schema/schema';

// MIDDLEWARE
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import router from '../src/routes/users';
import auth from '../src/routes/auth';

const PORT = process.env.PORT || 5000;

createConnection().then(async connection => {

    const server = express();
    server.use(bodyParser.json());
    server.use(cors());

    server.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));

    server.use(auth);

    server.use("/users", router);

    server.listen(PORT);

    console.log(`Server started running on http://localhost:${PORT}`);

}).catch(error => console.log(error));
