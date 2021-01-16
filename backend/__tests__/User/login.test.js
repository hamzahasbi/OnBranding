const request = require('supertest');
const {expect} = require('chai');
const app = require('../server/index');
const {UserLogin, UserRegister} = require('../MockSet/UserMock');
const config = require('config');
const db = config.get('mongoTestURI');
const {connectDB, closeDB} = require('../../config/database');
var parallel = require('mocha.parallel');
const {create, remove} = require('../../src/services/UserManager');


describe('Authentication', async () => {
    
    before(async () => {
        try {
            await connectDB(db);
            const payload = await create(UserRegister.valid);
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

    it('Valid User credentials', async () => {

        const res = await request(app).post('/api/login').send(UserLogin.valid);
        const token = res.body.token;
        expect(res.status).to.eq(200);
        expect(res.body).to.haveOwnProperty('token');
        expect(token).to.be.not.empty;
    });

    it('Invalid User Credentials', async () => {

        const res = await request(app).post('/api/login').send(UserLogin.invalid);
        expect(res.status).to.eq(401);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });

    it('Empty password', async () => {

        const res = await request(app).post('/api/login').send(UserLogin.with_no_password);
        expect(res.status).to.eq(400);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;

    });

})
