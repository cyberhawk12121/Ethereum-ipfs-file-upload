const { assert } = require('chai')

const StoreHash= artifacts.require("StoreHash")
require('chai')
    .use(require('chai-as-promised'))
    .should()


contract("StoreHash", (accounts)=>{
    let storeHash

    before(async ()=>{
        storeHash= await StoreHash.deployed();
    })

    describe('deployment', async ()=>{
        it('deployed successfully', async()=>{
            const address= storeHash.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address,null)
            assert.notEqual(address, undefined)
        })
    })

    describe('storage', async ()=>{
        it('updates the storeHash', async ()=>{
            let storeHash_
            storeHash_= 'abc12345'
            await storeHash.set(storeHash_)
            const result= await storeHash.get()
            assert.equal(result, storeHash_)
        })
    })
})