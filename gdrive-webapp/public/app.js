import AppController from "./src/appController.js";
import ConnectionManager from "./src/connectionManager.js";

const API_URL = "http://0.0.0.0:3000"

const appController = new AppController({
    connectionManager: new ConnectionManager({ 
        apiUrl: API_URL
    })
 })

 try {
    await appController.initialize()
 } catch (error) {
    console.log('error on initialize', error)
 }