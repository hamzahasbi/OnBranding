const request = require('supertest');
const {expect} = require('chai');
const app = require('../server/index');
const {UserRegister} = require('../__mocks__/UserMock');
const config = require('config');
const db = config.get('mongoTestURI');
const {connectDB, closeDB} = require('../../config/database');
const {remove} = require('../../src/services/UserManager');

describe('Registration', async () => {
    
    before(async () => {
        try {
            connectDB(db);
        } catch (err) {
            console.error(err);
        }
    });
    
    after(async () => {
        try {
            const removed = await remove(UserRegister.valid.email);
            closeDB();
        } catch(err) {
            console.error(err);
        }
    });

    it('Valid Data to create user', async () => {
        const res = await request(app).post('/api/register').send(UserRegister.valid);
        const token = res.body.token;
        expect(res.status).to.eq(201);
        expect(res.body).to.haveOwnProperty('token');
        expect(token).to.be.not.empty;
    });

    it('Valid Data but user already created', async () => {
        const res = await request(app).post('/api/register').send(UserRegister.valid);
        expect(res.status).to.eq(400);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

    it('Invalid Email', async () => {
        const res = await request(app).post('/api/register').send(UserRegister.invalid_email);
        expect(res.status).to.eq(400);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

    it ('Missing Infos', async () => {
        const res = await request(app).post('/api/register').send(UserRegister.with_missing_info);
        expect(res.status).to.eq(400);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

    it('Short Password', async () => {
        const res = await request(app).post('/api/register').send(UserRegister.short_pwd);
        expect(res.status).to.eq(400);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

})