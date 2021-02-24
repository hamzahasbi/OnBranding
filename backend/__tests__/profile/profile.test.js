const request = require('supertest');
const { expect } = require('chai');
const config = require('config');
const app = require('../server/index');
const { newSkill } = require('../__mocks__/SkillMock');
const {
    invalidProfile,
    validProfile,
    qs,
} = require('../__mocks__/ProfileMock');
const { UserLogin, UserRegister } = require('../__mocks__/UserMock');

const db = process.env.DATABASE_URL || config.get('mongoURIDocker');
const { connectDB, closeDB } = require('../../config/database');
const UserManager = require('../../src/services/UserManager');
const SkillManager = require('../../src/services/SkillManager');
const ProfileManager = require('../../src/services/ProfileManager');

let token = {};
const skillIds = [];
const profileIds = [];

describe('Post Set Test Suit', async () => {
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
        } catch (err) {
            console.error(err);
        }
    });

    after(async () => {
        try {
            await UserManager.remove({
                email: UserLogin.valid.email,
            });

            await Promise.all(
                skillIds.map(async (el) => {
                    await SkillManager.remove({ id: el });
                }),
            );

            closeDB();
        } catch (err) {
            console.error(err);
        }
    });

    it('Create Profile for authenticated user', async () => {
        const res = await request(app)
            .post('/api/profile/add')
            .auth(token, { type: 'bearer' })
            .send(validProfile);
        expect(res.status).to.eq(201);
        expect(res.body).to.haveOwnProperty('ressource');
        expect(res.body.ressource).to.be.not.empty;

        profileIds.push(res.body.ressource._id);
    });

    it('Create a profile for non autheticated user', async () => {
        const res = await request(app)
            .post('/api/profile/add')
            .send({ ...validProfile, skills: skillIds[0] });
        expect(res.status).to.eq(401);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

    it('Create a non Valid Profile', async () => {
        const res = await request(app)
            .post('/api/profile/add')
            .auth(token, { type: 'bearer' })
            .send(invalidProfile);
        expect(res.status).to.eq(400);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

    it('Update a Profile with valid data', async () => {
        const res = await request(app)
            .patch('/api/profile/update')
            .auth(token, { type: 'bearer' })
            .send({ id: profileIds[0], interest: 'updated intrest' });
        expect(res.status).to.eq(201);
        expect(res.body).to.haveOwnProperty('ressource');
        const { interest } = res.body.ressource;
        expect(interest).to.equal('updated intrest');
    });

    it('Remove a Profile', async () => {
        const willBeRemoved = profileIds.pop();

        const res = await request(app)
            .delete('/api/profile/remove')
            .auth(token, { type: 'bearer' })
            .send({ id: willBeRemoved });
        expect(res.status).to.eq(200);
        expect(res.body).to.haveOwnProperty('ressource');
        const { ressource } = res.body;
        expect(ressource._id).to.equal(willBeRemoved);
    });

    it('Get current User Profile', async () => {
        const res = await request(app)
            .get('/api/profile')
            .auth(token, { type: 'bearer' });
        expect(res.status).to.eq(200);
        expect(res.body).to.haveOwnProperty('ressource');
        const ressources = res.body.ressource;
        const { count } = res.body;
        expect(ressources.length).to.equal(count);
    });
});
