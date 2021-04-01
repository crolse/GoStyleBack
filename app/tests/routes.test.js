const request = require('supertest')
const app = require('../../server')
describe('Post Endpoints', () => {
  it('should create a new post1', async () => {
    const res = await request(app)
      .post('/api/promotion/add')
      .send({
        userId: "",
        codePromo: "",
      })
    expect(res.body.message).toEqual("aucune données reçu")
  })

  it('should create a new post 2', async () => {
    const res = await request(app)
      .get('/api/promotion/list/50')
    expect(res.body.message).toEqual("Erreur utilisateur")
  })
  it('should create a new post 3', async () => {
    const res = await request(app)
      .post('/api/user/create')
      .send({
        mail: "",
        password: "",
      })
    expect(res.body.message).toEqual("mail et/ou mot de passe vide")
  })
  it('should create a new post 4', async () => {
    const res = await request(app)
      .post('/api/user/connection')
      .send()
    expect(res.body.message).toEqual("mail et/ou mot de passe vide")
  })
})
