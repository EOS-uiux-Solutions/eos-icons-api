/* eslint-disable no-undef */
import chai from 'chai'
import request from 'supertest'
import server from 'server'
const { expect } = chai

describe('/icons', () => {
  describe('getFont', async () => {
    it("Should respond with 400 if there's an error on schema", async () => {
      const res = await request(server)
        .post('/v2/icons/getFile')
        .send({
          icons: ['cluster_role', 'abstract'],
          customizations: {
            rotateAngle: 250,
            flip: {
              horizontal: true,
              vertical: false
            }
          },
          // should be outlined or filled
          theme: 'non-outlined'
        }
        )
      expect(res.statusCode).equal(400, res.body.message)
    })

    it('Should respond with zip folder', async () => {
      const res = await request(server)
        .post('/v2/icons/getFont')
        .send({
          icons: ['cluster_role', 'abstract'],
          customizations: {
            rotateAngle: 250,
            flip: {
              horizontal: true,
              vertical: false
            }
          },
          theme: 'filled'
        }
        )
      expect(res.statusCode).equal(200, res.body.message)
      expect(res.headers['content-type']).equal('application/zip')
    }).timeout(5000)
  })
})
