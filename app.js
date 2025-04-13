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
    confKey: "config",
    dotenv: true,
    schema: schema,
    // data : data
}

fastify.register(sensible)
fastify.register(cors, corsOptions)
fastify.register(fastifyEnv, options)

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

console.log(fastify);

const start = async () => {
    try {
        await fastify.ready() // Wait for all plugins to be loaded
        await fastify.listen({ port: fastify.config.PORT || 3000 })
        fastify.log.info(`Server is running on port ${fastify.config.PORT || 3000}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
