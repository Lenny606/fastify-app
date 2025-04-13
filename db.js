// import fastifyPlugin from "fastify-plugin";
import mongoose from "mongoose";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function fastifyPlugin(fastify, option) {
    try {
        mongoose.connection.on('connected', () => {
            fastify.log.info({ actor: 'MongoDB' }, 'connected')
        })
        mongoose.connection.on('disconnected', () => {
            fastify.log.error({ actor: 'MongoDB' }, 'disconnected')
        })
        console.log(fastify.config.MONGO_URI);
        
        await mongoose.connect(fastify.config.MONGO_URI)
        fastify.decorate("mongoose", mongoose)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }

}

export default fastifyPlugin