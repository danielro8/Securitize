const request = require('supertest')
const app = require('../src/app')


test('Should get a currency', async () => {
    const response = await request(app).get('/api/wallet/currencies/USD').expect(200)
})

test('Should get a currency', async () => {
    const response = await request(app).get('/api/wallet/currencies/EUR').expect(200)
})

test('Should not  get a currency distint from USD or EUR', async () => {
    const response = await request(app).get('/api/wallet/currencies/ARG').expect(404)
})

test('Should update a currency', async () => {
    const response = await request(app).patch('/api/wallet/currencies/USD').send({value: 30}).expect(204)
})
test('Should update a currency', async () => {
    const response = await request(app).patch('/api/wallet/currencies/EUR').send({value: 30}).expect(204)
})
test('Should not update a currency distint from USD or EUR', async () => {
    const response = await request(app).patch('/api/wallet/currencies/ARG').send({value: 30}).expect(404)
})