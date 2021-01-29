const request = require('supertest');
const { expect } = require('chai');
const config = require('config');
const app = require('../server/index');
const {
  newSkill,
  updatedSkillFull,
  updatedSkillName,
  updatedSkillSameName
} = require('../__mocks__/SkillMock');
const { UserLogin, UserRegister } = require('../__mocks__/UserMock');

const db = process.env.DATABASE_URL || config.get('mongoTestURI');
const { connectDB, closeDB } = require('../../config/database');
const UserManager = require('../../src/services/UserManager');
const SkillManager = require('../../src/services/SkillManager');

let token = {};
let id;
describe('Skill Set Test Suit', async () => {
  before(async () => {
    try {
      await connectDB(db);
      const user = await request(app)
        .post('/api/register')
        .send(UserRegister.valid);
      token = user.body.token;
      const skill = await request(app)
        .post('/api/skill/add')
        .auth(token, { type: 'bearer' })
        .send({ ...newSkill, name: 'c' });
      id = skill.body.ressource._id;
    } catch (err) {
      console.error(err);
    }
  });

  after(async () => {
    try {
      UserManager.remove({
        email: UserLogin.valid.email
      });
      await SkillManager.remove({ name: newSkill.name });
      await SkillManager.remove({ name: 'c' });
      closeDB();
    } catch (err) {
      console.error(err);
    }
  });

  it('Create a skill for authenticated user', async () => {
    const res = await request(app)
      .post('/api/skill/add')
      .auth(token, { type: 'bearer' })
      .send(newSkill);
    expect(res.status).to.eq(201);
    expect(res.body).to.haveOwnProperty('ressource');
    expect(res.body.ressource).to.be.not.empty;
  });

  it('Create a skill with duplicate name', async () => {
    const res = await request(app)
      .post('/api/skill/add')
      .auth(token, { type: 'bearer' })
      .send(updatedSkillSameName);
    expect(res.status).to.eq(500);
    expect(res.body).to.haveOwnProperty('errors');
    expect(res.body.errors).to.be.not.empty;
  });

  it('Create a skill for NON authenticated user', async () => {
    const res = await request(app).post('/api/skill/add').send(newSkill);
    expect(res.status).to.eq(401);
    expect(res.body).to.haveOwnProperty('errors');
    expect(res.body.errors).to.be.not.empty;
  });

  it('Get List of skills', async () => {
    const res = await request(app).get('/api/skill');
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    expect(res.body.ressource).to.be.not.empty;
  });
  it('Get a skill by property', async () => {
    const res = await request(app).get(`/api/skill/${id}`);
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    expect(res.body.ressource).to.be.not.empty;
  });

  it('Update a skill with no ID', async () => {
    const res = await request(app)
      .patch('/api/skill/update')
      .auth(token, { type: 'bearer' })
      .send(updatedSkillFull);
    expect(res.status).to.eq(422);
    expect(res.body).to.haveOwnProperty('errors');
    expect(res.body.errors).to.be.not.empty;
  });
  it('Update a skill with no token', async () => {
    const res = await request(app)
      .patch('/api/skill/update')
      .send(updatedSkillFull);
    expect(res.status).to.eq(401);
    expect(res.body).to.haveOwnProperty('errors');
    expect(res.body.errors).to.be.not.empty;
  });

  it('Update a skill with valid entries', async () => {
    const ressource = {
      id,
      ...updatedSkillFull
    };
    const res = await request(app)
      .patch('/api/skill/update')
      .auth(token, { type: 'bearer' })
      .send(ressource);
    expect(res.status).to.eq(201);
    expect(res.body).to.haveOwnProperty('ressource');
    expect(res.body.ressource).to.be.not.empty;
  });

  it('Update a skill with valid entries', async () => {
    const ressource = {
      id,
      ...updatedSkillName
    };

    const res = await request(app)
      .patch('/api/skill/update')
      .auth(token, { type: 'bearer' })
      .send(ressource);
    expect(res.status).to.eq(201);
    expect(res.body).to.haveOwnProperty('ressource');
    expect(res.body.ressource).to.be.not.empty;
  });

  it('Remove a skill', async () => {
    const res = await request(app)
      .delete('/api/skill/remove')
      .auth(token, { type: 'bearer' })
      .send({ id });
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    expect(res.body.ressource).to.be.not.empty;
  });
});
