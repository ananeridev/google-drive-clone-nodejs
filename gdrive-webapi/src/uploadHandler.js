import Busboy from 'busboy'
import fs from 'fs'
import { pipeline } from 'stream/promises' 
import { logger } from './logger'

export default class UploadHandler {
    constructor({io, socketId, downloadsFolder, messageTimeDelay = 200}) {
        this.io = io
        this.socketId = socketId
        this.downloadsFolder = downloadsFolder
        this.ON_UPLOAD_EVENT = 'file-upload'
        this.messageTimeDelay = messageTimeDelay
    }

    canExecute(lastExecution) {
    //     return (Date.now() - lastExecution) >= 300
    // }

    }


    handleFileBytes(filename) {
        this.lasMessageSent = Date.now()
        let processedAlready = 0

        async function* handleData(source) { 
            for await(const chunk of source) {

                // yeild is a generator function that makes the function return a generator asyncrounous function
                yield chunk

                processedAlready += chunk.length
                if(!this.canExecute(this.lasMessageSent)) { 
                    continue;
                }

                this.io.to(this.socketId).emit(this.ON_UPLOAD_EVENT, { processedAlready, filename })
                logger.info(`File [${filename}] got ${processedAlready} bytes to ${this.socketId}`)
            }
        }

        return handleData.bind(this)
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