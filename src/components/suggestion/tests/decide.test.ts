/* eslint-disable no-undef */
import chai from 'chai'
import request from 'supertest'
import server from 'server'
import { deleteSuggestion } from '../service.suggestion'
import { deleteApprovedSuggestion, getSetOfIcons } from 'components/icons/service.icons'
const { expect } = chai

describe('/suggestions', () => {
  describe('decide', async () => {
    it('Should respond with 401 if not authorized', async () => {
      const res = await request(server)
        .post('/v2/suggestion/decide')
        .send({
          iconName: 'abstract',
          type: 'tags',
          suggestions: ['base', 'tag2'],
          status: 'approved'
        })
      expect(res.statusCode).equal(401, res.body.message)
    })
    it("Should respond with 400 if there's an error on schema", async () => {
      const res = await request(server)
        .post('/v2/suggestion/decide')
        .set({ secretkey: 'secretkey' })
        .send({
          // icon name is missing
          type: 'tags',
          suggestions: ['base', 'tag2'],
          status: 'approved'
        })
      expect(res.statusCode).equal(400, res.body.message)
    })

    it('Should respond with 200 if suggestion rejected successfully', async () => {
      const res = await request(server)
        .post('/v2/suggestion/add')
        .send({
          iconName: 'abstract',
          suggestion: 'testSuggestion',
          type: 'category'
        })
      const res2 = await request(server)
        .post('/v2/suggestion/decide')
        .set({ secretkey: 'secretkey' })
        .send({
          iconName: 'abstract',
          type: 'tags',
          suggestions: ['testSuggestion'],
          status: 'rejected'
        })
      expect(res2.statusCode).equal(200, res.body.message)
      await deleteSuggestion('abstract', 'testSuggestion')
    })

    it('Should respond with 200 if suggestion approved successfully', async () => {
      const res = await request(server)
        .post('/v2/suggestion/add')
        .send({
          iconName: 'abstract',
          suggestion: 'testSuggestion',
          type: 'category'
        })
      const res2 = await request(server)
        .post('/v2/suggestion/decide')
        .set({ secretkey: 'secretkey' })
        .send({
          iconName: 'abstract',
          type: 'tags',
          suggestions: ['testSuggestion'],
          status: 'approved'
        })
      expect(res2.statusCode).equal(200, res.body.message)
      await deleteSuggestion('abstract', 'testSuggestion')
      const icon = await getSetOfIcons(['abstract'], 'tags')
      expect(icon[0].tags).include('testSuggestion')
      await deleteApprovedSuggestion('abstract', 'testSuggestion')
    })
  })
})
