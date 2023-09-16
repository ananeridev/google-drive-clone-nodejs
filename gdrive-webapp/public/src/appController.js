export default class AppController {
    constructor({ connectionManager }) {
        this.connectionManager = connectionManager
    }

    async initialize() {
    await this.updateCurrentFiles()
    }

    async updateCurrentFiles() { 
        const files = await this.connectionManager.currentFiles()
        console.log({ files })
    }
}