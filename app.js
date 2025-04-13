import fastifyEnv from '@fastify/env'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})

// SCHEMA ENV
const schema = {
    type: 'object',
    required: ['PORT', "MONGO_URI"],
    properties: {
        PORT: {
            type: "string",
            default: 3000
        },
        MONGO_URI : {
            type: "string",
        }
    }
}
const corsOptions = {

}

const options = {
    dotenv: true,
    schema: schema,
    // data : data
}
fastify.register(sensible)
fastify.register(cors, corsOptions)
fastify.register(cors, corsOptions)
fastify.register(fastifyEnv, options).ready(
    (err) => {
        if (err) {
            console.error('Error loading environment variables:', err)
            process.exit(1)
        }
    }
)

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

console.log(fastify);


const start = async () => {
    try {
        fastify.listen({ port: process.env.PORT || 3000 })
        fastify.log.info(`Server is running `)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
