/* eslint-disable no-undef */
import chai from 'chai'
import request from 'supertest'
import server from 'server'
import { deleteSuggestion } from '../service.suggestion'
const { expect } = chai

describe('/suggestions', () => {
  describe('add', async () => {
    it("Should respond with 400 if there's an error on schema", async () => {
      const res = await request(server)
        .post('/v2/suggestion/add')
        .send({
          iconName: 'abstract',
          suggestion: 'base',
          // should be tags or category
          type: 'name'
        })
      expect(res.statusCode).equal(400, res.body.message)
    })

    it('Should respond with 200 if suggestions added successfully', async () => {
      const res = await request(server)
        .post('/v2/suggestion/add')
        .send({
          iconName: 'abstract',
          suggestion: 'testSuggestion',
          type: 'category'
        })
      expect(res.statusCode).equal(200, res.body.message)
    })

    it('Should respond with 409 if suggestion is already exist or suggested', async () => {
      const res = await request(server)
        .post('/v2/suggestion/add')
        .send({
          iconName: 'abstract',
          suggestion: 'testSuggestion',
          type: 'category'
        })
      expect(res.statusCode).equal(409, res.body.message)
      await deleteSuggestion('abstract', 'testSuggestion')
    })
  })
})
