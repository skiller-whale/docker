const assert = require('node:assert')
const { describe, it, test, before, beforeEach, afterEach } = require('node:test')
const memoryDao = require('../src/memoryDao')

describe('tests', async () => {
    // can't do an 'await' here as there is a node 
    let initialWhales;

    beforeEach(async () => {
        // setup
        //  save the initial whales before running tests
        memoryDao.start()
            .then(memoryDao.getAllWhales)
            .then((whales) => {
                initialWhales = [...whales]
            })
    });
    afterEach(memoryDao.stop.bind(memoryDao))

    it('tests addWhale', async () => {
        memoryDao.addWhale('test_whale_1')
        expected_whales = [...initialWhales,'test_whale_1']
        
        all_whales = await memoryDao.getAllWhales()
        assert.deepEqual(all_whales, expected_whales)
    });

    it('tests resetWhales', async () => {
        memoryDao.addWhale('test_whale_1')
        memoryDao.resetWhales()

        all_whales = await memoryDao.getAllWhales()
        assert.deepEqual(all_whales, initialWhales)
    })
});
