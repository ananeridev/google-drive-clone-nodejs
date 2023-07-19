import FileHelper from "./fileHelper.js"
import { logger } from "./logger.js"
import { dirname, resolve  } from 'path'
import { fileURLToPath  } from "url" 

const __dirname = dirname(fileURLToPath(import.meta.url))
const deafultDownloadsFolder = resolve(__dirname, '../', "downloads")
export default class Routes {
    io
    constructor(downloadsFolder = deafultDownloadsFolder) {    
        this.downloadsFolder = downloadsFolder
        this.fileHelper = FileHelper
    }

    setSocketInstance(io) { 
        this.io = io
    }

   async defaultRoute (request, response ) {
        response.end('hey world')
    }

    async options (request, response ) {
        response.writeHead(204)
        response.end('hey world')
    }

    async get (request, response ) {
        const files = await this.fileHelper.getFileStatus(this.downloadsFolder)

        response.writeHead(200)
        response.end(JSON.stringify(files))
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

