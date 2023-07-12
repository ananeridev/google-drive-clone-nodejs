import {
    describe,
    test,
    expect
} from '@jest/globals'
import jest from 'jest-mock'
import Routes from '../../src/routes.js'

describe('#Routes suite test', () => {

    describe('#setSocketInstance', () => {
        test('setSocket should store io instance', () => {
            const routes = new Routes()
            const ioObj = {
                to: (id) => ioObj,
                emit: (event, message) => {} 
            
            }

            routes.setSocketInstance(ioObj)
            expect(routes.io).toStrictEqual(ioObj)
        })
    })

    describe('#handler', () => { 
        const defaultParams = { 
            request: {
                headers: {
                    'Content-Type': 'multipart/form-data'                
                },
                method: '',
                body: {}
            },
            response: {
                setHeader: jest.fn(),
                writeHead: jest.fn(), 
                end: jest.fn()
            },
            values: () => Object.values(defaultParams)
        }
        test('given an inexistent route it should choose default route', () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.request.method = 'inexistent'
            routes.handler(...params.values())
            expect(params.response.end).toHaveBeenCalledWith('hey world')
        })

        test.todo('it should set any request with CORS enabled')
        test.todo('given method OPTIONS it should choose options route')
        test.todo('given method POST it should choose post route')
        test.todo('given method GET it should choose ge route')

    })
})