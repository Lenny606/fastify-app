import fastifyEnv from '@fastify/env'
import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})

// SCHEMA
const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
        PORT: {
            type: "string",
            default: 3000
        }
    }
}

const options = {
    confKey: "config",
    dotenv: true,
    schema: schema,
    // data : data
}

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

console.log( fastify.config);


const start = async () => {
    try {
        fastify.listen({ port: 3000 })
        fastify.log.info(`Server is running `)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
