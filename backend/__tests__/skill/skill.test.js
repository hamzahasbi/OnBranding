const request = require('supertest');
const {expect} = require('chai');
const app = require('../server/index');
const {
    newSkill,
    updatedSkillFull,
    updatedSkillName,
    updatedSkillSameName
} = require('../__mocks__/SkillMock');
const {UserLogin, UserRegister} = require('../__mocks__/UserMock');
const config = require('config');
const db = process.env.DATABASE_URL || config.get('mongoTestURI');
const {connectDB, closeDB} = require('../../config/database');
const {create, remove} = require('../../src/services/UserManager');

let token = {};
describe.only('Skill Set Test Suit', async () => {
    
    before(async () => {
        try {
            connectDB(db);
            const payload = await create(UserRegister.valid);
            const user = await request(app).post('/api/login').send(UserLogin.valid);
            token = user.body.token;
        } catch(err) {
            console.error(err);
        }
    });
    
    after(async () => {
        try {
            const removed = await remove(UserLogin.valid.email);
            closeDB();
        } catch(err) {
            console.error(err);
        }
    });

    it('Create a skill for authenticated user', async () => {
        
        const res = await request(app).post('/api/skill/add').auth(token, {type: 'bearer'}).send(newSkill);
        expect(res.status).to.eq(201);
        expect(res.body).to.haveOwnProperty('ressource');

    });

    it('Create a skill for NON authenticated user', async () => {

        const res = await request(app).post('/api/skill/add').send(newSkill);
        expect(res.status).to.eq(403);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

    it('Update a skill with all data changed', async () => {

        const res = await request(app).patch('/api/skill/update').auth(token, {type: 'bearer'}).send(updatedSkillFull);
        expect(res.status).to.eq(201);
        expect(res.body).to.haveOwnProperty('ressource');
        expect(res.body.ressource).to.be.not.empty;

    });

})
