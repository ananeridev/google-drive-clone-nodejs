import { jest } from '@jest/globals'
import { Readable, Transform, Writable } from 'stream'
export default class TestUtil {

    static mockDateNow(mockImplementationPeriods) {
        const now = jest.spyOn(global.Date, global.Date.now.name)

        mockImplementationPeriods.forEach(time => {
            now.mockReturnValueOnce(time)
        })
    }

    static getTimeFromDate(dateString) {
        return new Date(dateString).getTime()
    }

    // buffer with more chunks
    static generateReadableStream(data) {
        return new Readable({
            objectMode: true,
            read() {
                for (const item of data) {
                    this.push(item)
                }

                this.push(null)
            }
        })
    }
    static generateWritableStream(onData) {
        return new Writable({
            objectMode: true,
            write(chunk, encondig, cb) {
                onData(chunk)
                
                cb(null, chunk)
            }
        })
    }

    static generateTransformStream(onData) {
        return new Transform({
            objectMode: true,
            transform(chunk, enconding, cb) {
                // jest function, that each call will be called
                onData(chunk)
                cb(null, chunk)
            }
        })
    }
}