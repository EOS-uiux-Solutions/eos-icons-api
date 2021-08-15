/* eslint-disable no-undef */
import chai from 'chai'
import request from 'supertest'
import server from 'server'
const { expect } = chai

describe('/suggestions', () => {
  describe('getAll', async () => {
    it('Should respond with 401 if not authorized', async () => {
      const res = await request(server)
        .get('/v2/suggestion/getAll')
      expect(res.statusCode).equal(401, res.body.message)
    })

    it('Should respond with 200 if suggestions returned correctly', async () => {
      const res = await request(server)
        .get('/v2/suggestion/getAll')
        .set({ secretkey: 'secretkey' })
      expect(res.statusCode).equal(200, res.body.message)
    })
  })
})
