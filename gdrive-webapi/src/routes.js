import { logger } from "./logger.js"

export default class Routes {
    io
    constructor() {
      // TODO document why this constructor is empty
    

    }

    setSocketInstance(io) { 
        this.io = io
    }

   async defaultRoute (request, response ) {
        response.end('hey world')
    }

    async options (request, response ) {
        repsonse.writeHead(204)
        response.end('hey world')
    }

    async get (request, response ) {
        logger.info('get')
        response.end()
    }

    async post (request, response ) {
        logger.info('post')
        response.end()
    }

    handler(request, response ) {
        response.setHeader('Access-Control-Allow-Origin', '*')
        const chosen =  this[request.method.toLowerCase()] || this.defaultRoute
        
       return chosen.apply(this, [request, response])
    }
}

