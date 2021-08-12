/* eslint-disable no-undef */
import chai from 'chai'
import request from 'supertest'
import server from 'server'
const { expect } = chai

describe('/icons', () => {
  describe('getIcons', async () => {
    it("Should respond with 400 if there's an error on schema", async () => {
      const res = await request(server)
        .post('/v2/icons/getIcons')
        .send({
          color: 15
        })
      expect(res.statusCode).equal(400, res.body.message)
    })

    it('Should respond with 200 if icons returned correctly', async () => {
      const res = await request(server)
        .post('/v2/icons/getIcons')
        .send({
          color: 'red'
        })
      expect(res.statusCode).equal(200, res.body.message)
      expect(res.body.data.icons[0].svg).contain('red')
    })
  })
})
