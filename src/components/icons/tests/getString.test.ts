/* eslint-disable no-undef */
import chai from 'chai'
import request from 'supertest'
import server from 'server'
const { expect } = chai

describe('/icons', () => {
  describe('getString', async () => {
    it("Should respond with 400 if there's an error on schema", async () => {
      const res = await request(server)
        .post('/v2/icons/getString')
        .send({
          icons: ['fawzi', 'ahmed'],
          stringType: 'base64',
          customizations: {
            colorCode: 'red',
            rotateAngle: 250,
            flip: {
              horizontal: true,
              // should be boolean
              vertical: 'no'
            }
          },
          theme: 'outlined'
        })
      expect(res.statusCode).equal(400, res.body.message)
    })

    it('Should respond with 200 if icons returned correctly', async () => {
      const res = await request(server)
        .post('/v2/icons/getString')
        .send({
          icons: ['abstract'],
          stringType: 'svg',
          customizations: {
            colorCode: 'red',
            rotateAngle: 250,
            flip: {
              horizontal: true,
              vertical: false
            }
          },
          theme: 'outlined'
        })
      expect(res.statusCode).equal(200, res.body.message)
      expect(res.body.data).have.property('stringType').equal('svg')
      expect(res.body.data.icons[0].iconString).contain('red')
      expect(res.body.data.icons[0].iconString).contain('rotate(250,')
      expect(res.body.data.icons[0]).have.property('name')
      expect(res.body.data.icons[0]).have.property('iconString')
    })
  })
})
