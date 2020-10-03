const request = require('supertest')
const app = require('../src/app')
const { isDateOlderThan } = require("../src/helpers/time")

test('Should get a a balance', async () => {
    const response = await request(app).get('/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/balance').expect(200)
})

test('Should get a balance with EURO currency', async () => {
    const response = await request(app).get('/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/balance/EUR').expect(200)
})

test('Should get a balance with USD currency', async () => {
    const response = await request(app).get('/api/wallet/addresses/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae/balance/USD').expect(200)
})

test('Should get a balance with invalid address', async () => {
    const response = await request(app).patch('/api/wallet/addresses/432432432432432/balance').send({value: 30}).expect(404)
})
test('Should get a balance with invalid address with EURO currency', async () => {
    const response = await request(app).patch('/api/wallet/addresses/432432432432432/balance/EUR').send({value: 30}).expect(404)
})
test('Should get a balance with invalid address with USD currency', async () => {
    const response = await request(app).patch('/api/wallet/addresses/432432432432432/balance/USD').send({value: 30}).expect(404)
})

test('Should return true with a date older than one year', async () => {
    const timeStamp = 1538603638 // 03/10/2018
    expect(isDateOlderThan(timeStamp, 1, 'year')).toBe(true)
})

test('Should return false with a date younger than one year', async () => {
    const timeStamp = 1601762038
    expect(isDateOlderThan(timeStamp, 1, 'year')).toBe(false)
})