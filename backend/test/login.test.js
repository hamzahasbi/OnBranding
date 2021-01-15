const request = require('supertest');
const {expect} = require('chai');
const app = require('./server/index');
const {valid, invalid, with_no_password} = require('./MockSet/UserMock');
const config = require('config');
const db = config.get('mongoURI');
const {connectDB, closeDB} = require('../config/database');
var parallel = require('mocha.parallel');


parallel('Authentication', async () => {
    
    before((done) => {
        try {
            connectDB(db);
            done();
        } catch(err) {
            done(err);
        }
    });
    
    after((done) => {
        try {
            closeDB();
            done();
        } catch(err) {
            done(err);
        }
    });

    it('Valid User credentials', async () => {
        try {
            const res = await request(app).post('/api/login').send(valid);
            const token = res.body.token;
            expect(res.status).to.eq(200);
            expect(res.body).to.haveOwnProperty('token');
            expect(token).to.be.not.empty;
            // done();
        } catch (err) {
            console.error(err);
        }
    });

    it ('Invalid User Credentials', async () => {
        try {
            const res = await request(app).post('/api/login').send(invalid);
            expect(res.status).to.eq(401);
            expect(res.body).to.haveOwnProperty('errors');
            expect(res.body.errors).to.be.not.empty;
        } catch (err) {
            console.error(err);
        }
    });

    it ('Empty password', async () => {
        try {
            const res = await request(app).post('/api/login').send(with_no_password);
            expect(res.status).to.eq(400);
            expect(res.body).to.haveOwnProperty('errors');
            expect(res.body.errors).to.be.not.empty;
        } catch (err) {
            console.error(err);
        }
    });

})
