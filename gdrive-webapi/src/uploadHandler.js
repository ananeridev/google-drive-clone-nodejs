import Busboy from 'busboy'
import fs from 'fs'
import { pipeline } from 'stream/promises' 
import { logger } from './logger'

export default class UploadHandler {
    constructor({io, socketId, downloadsFolder}) {
        this.io = io
        this.socketId = socketId
        this.downloadsFolder = downloadsFolder
    }

    handleFileBytes() {
        
    }

    async onFile(fieldname, file, filename) {
        const saveTo = `${this.downloadsFolder}/${filename}`
        await pipeline(
            // first step: take a readable stream
            file,

            // second step: filter, converter and transform the data
            this.handleFileBytes.apply(this, [filename]),

            // thirs step: exit of the process, one writable stream
            fs.createWriteStream(saveTo)
        )

        logger.info(`File [${filename}] finished`)

    }

    registerEvents(headers, onFinish) {
        const busboy  = new Busboy({ headers })

        busboy.on("file", this.onFile.bind(this))
        busboy.on("finish", onFinish)

        return busboy
    }
}