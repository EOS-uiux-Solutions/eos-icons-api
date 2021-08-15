/* eslint-disable no-undef */
import chai from 'chai'
import request from 'supertest'
import server from 'server'
const { expect } = chai

describe('/icons', () => {
  describe('getFile', async () => {
    it("Should respond with 400 if there's an error on schema", async () => {
      const res = await request(server)
        .post('/v2/icons/getFile')
        .send({
          // icons array is missing
          exportAs: 'svg',
          exportSize: 500,
          customizationConfig: {
            colorCode: '#000000',
            rotateAngle: 250,
            flip: {
              horizontal: true,
              vertical: false
            }
          },
          theme: 'outlined'
        })
      expect(res.statusCode).equal(400, res.body.message)
    })

    it('Should respond with zip folder when multiple icons are requested', async () => {
      const res = await request(server)
        .post('/v2/icons/getFile')
        .send({
          icons: ['cluster_role', 'pin', 'timeout'],
          exportAs: 'svg',
          exportSize: 500,
          customizationConfig: {
            colorCode: '#000000',
            rotateAngle: 250,
            flip: {
              horizontal: true,
              vertical: false
            }
          },
          theme: 'outlined'
        }
        )
      expect(res.statusCode).equal(200, res.body.message)
      expect(res.headers['content-type']).equal('application/zip')
    })

    it('Should respond with svg file when svg icon is requested', async () => {
      const res = await request(server)
        .post('/v2/icons/getFile')
        .send({
          icons: ['cluster_role'],
          exportAs: 'svg',
          exportSize: 500,
          customizationConfig: {
            colorCode: '#000000',
            rotateAngle: 250,
            flip: {
              horizontal: true,
              vertical: false
            }
          },
          theme: 'outlined'
        }
        )
      expect(res.statusCode).equal(200, res.body.message)
      expect(res.headers['content-type']).equal('image/svg+xml')
    })

    it('Should respond with png file when image icon is requested', async () => {
      const res = await request(server)
        .post('/v2/icons/getFile')
        .send({
          icons: ['cluster_role'],
          exportAs: 'png',
          exportSize: 500,
          customizationConfig: {
            colorCode: '#000000',
            rotateAngle: 250,
            flip: {
              horizontal: true,
              vertical: false
            }
          },
          theme: 'outlined'
        }
        )
      expect(res.statusCode).equal(200, res.body.message)
      expect(res.headers['content-type']).equal('image/png')
    })
  })
})
