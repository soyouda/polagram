require("dotenv").config()
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan"; // logger(로깅 전용 모듈)


const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hi"
    }
}

const server = new GraphQLServer({typeDefs, resolvers})

server.express.use(logger("dev"));

server.start({ port: PORT }, () => console.log(`Server running on port http://localhost:${PORT}`));


