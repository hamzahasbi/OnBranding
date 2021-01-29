const request = require('supertest');
const { expect } = require('chai');
const config = require('config');
const app = require('../server/index');
const { newSkill } = require('../__mocks__/SkillMock');
const {
  validProject,
  invalidProject,
  qs
} = require('../__mocks__/ProjectMock');
const { UserLogin, UserRegister } = require('../__mocks__/UserMock');

const db = process.env.DATABASE_URL || config.get('mongoTestURI');
const { connectDB, closeDB } = require('../../config/database');
const UserManager = require('../../src/services/UserManager');
const SkillManager = require('../../src/services/SkillManager');
const ProjectManager = require('../../src/services/ProjectManager');

let token = {};
const skillIds = [];
const projectIds = [];

describe('Project Set Test Suit', async () => {
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
        .send(newSkill);
      skillIds.push(skill.body.ressource._id);
      const project = await request(app)
        .post('/api/project/add')
        .auth(token, { type: 'bearer' })
        .send(validProject);
      projectIds.push(project.body.ressource._id);
      const project_2 = await request(app)
        .post('/api/project/add')
        .auth(token, { type: 'bearer' })
        .send(validProject);
      projectIds.push(project_2.body.ressource._id);
    } catch (err) {
      console.error(err);
    }
  });

  after(async () => {
    try {
      await UserManager.remove({
        email: UserLogin.valid.email
      });

      await Promise.all(
        skillIds.map(async (el) => {
          await SkillManager.remove({ id: el });
        })
      );

      await Promise.all(
        projectIds.map(async (el) => {
          await ProjectManager.remove({ id: el });
        })
      );

      closeDB();
    } catch (err) {
      console.error(err);
    }
  });

  it('Create a Project for authenticated user', async () => {
    const res = await request(app)
      .post('/api/project/add')
      .auth(token, { type: 'bearer' })
      .send(validProject);
    expect(res.status).to.eq(201);
    expect(res.body).to.haveOwnProperty('ressource');
    expect(res.body.ressource).to.be.not.empty;

    projectIds.push(res.body.ressource._id);
  });

  it('Create a project for non autheticated user', async () => {
    const res = await request(app).post('/api/project/add').send(validProject);
    expect(res.status).to.eq(401);
    expect(res.body).to.haveOwnProperty('errors');
    expect(res.body.errors).to.be.not.empty;
  });

  it('Create a non Valid Project', async () => {
    const res = await request(app)
      .post('/api/project/add')
      .auth(token, { type: 'bearer' })
      .send(invalidProject);
    expect(res.status).to.eq(400);
    expect(res.body).to.haveOwnProperty('errors');
    expect(res.body.errors).to.be.not.empty;
  });

  it('Update a Project with valid data', async () => {
    const res = await request(app)
      .patch('/api/project/update')
      .auth(token, { type: 'bearer' })
      .send({ id: projectIds[0], tags: skillIds.join(',') });
    expect(res.status).to.eq(201);
    expect(res.body).to.haveOwnProperty('ressource');
    const { tags } = res.body.ressource;
    expect(tags.length).to.equal(1);
  });

  it('Remove a Project', async () => {
    const willBeRemoved = projectIds.pop();

    const res = await request(app)
      .delete('/api/project/remove')
      .auth(token, { type: 'bearer' })
      .send({ id: willBeRemoved });
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    const { ressource } = res.body;
    expect(ressource._id).to.equal(willBeRemoved);
  });

  it('Get list of all authenticated user\'s projects with no query params', async () => {
    const res = await request(app)
      .get('/api/project')
      .auth(token, { type: 'bearer' });
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    const ressources = res.body.ressource;
    const { count } = res.body;
    expect(ressources.length).to.equal(count);
  });

  it('Get list of all authenticated user\'s projects with query params & no filter', async () => {
    const res = await request(app)
      .get('/api/project')
      .auth(token, { type: 'bearer' })
      .query(qs);
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    const ressources = res.body.ressource;
    const { count } = res.body;
    expect(ressources.length).to.equal(count);
  });

  it('Get list of all user\'s projects with no query params by email', async () => {
    const res = await request(app)
      .get('/api/project/list')
      .query({ email: UserRegister.valid.email });
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    const ressources = res.body.ressource;
    const { count } = res.body;
    expect(ressources.length).to.equal(count);
  });

  it('Get list of all user\'s projects with query params & filter by email', async () => {
    const res = await request(app)
      .get('/api/project/list')
      .query({
        ...qs,
        email: UserRegister.valid.email,
        tags: '6011ae06739fa71dbf34d892'
      });
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    const ressources = res.body.ressource;
    const { count } = res.body;
    expect(ressources.length).to.equal(count);
  });

  it('Get list of all user\'s projects with query params & filter by email', async () => {
    const res = await request(app)
      .get('/api/project/list')
      .query({
        ...qs,
        email: UserRegister.valid.email,
        offset: 0,
        tags: skillIds[0].toString()
      });
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    const ressources = res.body.ressource;
    const { count } = res.body;
    expect(ressources.length).to.equal(count);
  });

  it('Get Project by id', async () => {
    const res = await request(app)
      .get('/api/project/list')
      .query({
        email: UserRegister.valid.email,
        project: projectIds[0].toString()
      });
    expect(res.status).to.eq(200);
    expect(res.body).to.haveOwnProperty('ressource');
    const ressources = res.body.ressource;
    const { count } = res.body;
    expect(ressources.length).to.equal(count);
  });
});
