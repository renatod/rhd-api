const request = require('supertest')
const app = require('../src/server')
const { Repository } = require('../src/models')

describe('Repositories`s API', () => {

  it('should retrieve the repositories', async () => {
    const res = await request(app)
      .get('/repositories')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
  })

  it('should retrieve an especific repository', async () => {
    const [repo] = await Repository.findOrCreate({
      where: { fullName: 'Dummy' },
      defaults: { fullName: 'Dummy', description: 'Dummy Repo for tests' }
    })

    const res = await request(app)
      .get(`/repositories/${repo.id}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('fullName')
    expect(res.body.id).toEqual(repo.id)
    expect(res.body.fullName).toEqual(repo.fullName)
  })

  it('should retrieve javaScript repositories limited by one record.', async () => {
    const res = await request(app)
      .get('/repositories')
      .query({
        page: 1,
        per_page: 1,
        lang: 'JavaScript'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('rows')
    expect(res.body.rows.length).toEqual(1)
    expect(res.body.rows[0].language).toEqual('JavaScript')
  })
})