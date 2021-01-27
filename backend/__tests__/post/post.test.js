const request = require('supertest');
const {expect} = require('chai');
const app = require('../server/index');
const {newSkill} = require('../__mocks__/SkillMock');
const {validPost, invalidPost, qs} = require('../__mocks__/PostMock');
const {UserLogin, UserRegister} = require('../__mocks__/UserMock');
const config = require('config');
const db = process.env.DATABASE_URL || config.get('mongoTestURI');
const {connectDB, closeDB} = require('../../config/database');
const UserManager = require('../../src/services/UserManager');
const PostManager = require('../../src/services/PostManager');

let token = {};
let skillIds = [], postIds = [];

describe.only('Post Set Test Suit', async () => {
    
    before(async () => {
        try {
            connectDB(db);
            const user = await request(app).post('/api/register').send(UserRegister.valid);
            token = user.body.token;
            const skill = await request(app).post('/api/skill/add').auth(token, {type: 'bearer'}).send(newSkill);
            skillIds.push(skill.body.ressource._id);
            const post = await request(app).post('/api/post/add').auth(token, {type: 'bearer'}).send(validPost);
            postIds.push(post.body.ressource._id);
            const post_2 = await request(app).post('/api/post/add').auth(token, {type: 'bearer'}).send(validPost);
            postIds.push(post_2.body.ressource._id) ;
        } catch(err) {
            console.error(err);
        }
    });
    
    after(async () => {
        try {
            const userRemoved = await UserManager.remove({email: UserLogin.valid.email});
            skillIds.forEach(async (el) => {
                await SkillManager.remove({id: el});
            })
            postIds.forEach(async (el) => {
                await PostManager.remove({id: el});
            })
            
            closeDB();
        } catch(err) {
            console.error(err);
        }
    });

    it('Create a Post for authenticated user', async () => {

        const res = await request(app).post('/api/post/add').auth(token, {type: 'bearer'}).send(validPost);
        expect(res.status).to.eq(201);
        expect(res.body).to.haveOwnProperty('ressource');
        expect(res.body.ressource).to.be.not.empty;

        postIds.push(res.body.ressource._id);

    });

    it('Create a post for non autheticated user', async () => {

        const res = await request(app).post('/api/post/add').send(validPost);
        expect(res.status).to.eq(401);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;
    });
   
    it('Create a non Valid Post', async () => {
        
        const res = await request(app).post('/api/post/add').auth(token, {type: 'bearer'}).send(invalidPost);
        expect(res.status).to.eq(400);
        expect(res.body).to.haveOwnProperty('errors');
        expect(res.body.errors).to.be.not.empty;

    });

    it('Update a Post with valid data', async () => {

        const res = await request(app).patch('/api/post/update').auth(token, {type: 'bearer'}).send({id: postIds[0], tags: skillIds.join(',')});
        expect(res.status).to.eq(201);
        expect(res.body).to.haveOwnProperty('ressource');
        const tags = res.body.ressource.tags;
        expect(tags.length).to.equal(2);

    });

    it('Remove a Post', async () => {

        const willBeRemoved = postIds.pop();

        const res = await request(app).delete('/api/post/remove').auth(token, {type: 'bearer'}).send({id: willBeRemoved});
        expect(res.status).to.eq(200);
        expect(res.body).to.haveOwnProperty('ressource');
        const ressource = res.body.ressource;
        expect(ressource._id).to.equal(willBeRemoved);
    })

    it('Get list of all authenticated user\'s posts with no query params', async () => {

        const res = await request(app).get('/api/post').auth(token, {type: 'bearer'});
        expect(res.status).to.eq(200);
        expect(res.body).to.haveOwnProperty('ressource');
        const ressources = res.body.ressource;
        expect(ressources.length).to.equal(3);

    });


    it('Get list of all authenticated user\'s posts with query params & no filter', async () => {

        const res = await request(app).get('/api/post').auth(token, {type: 'bearer'}).query(qs);
        expect(res.status).to.eq(200);
        expect(res.body).to.haveOwnProperty('ressource');
        const ressources = res.body.ressource;
        expect(ressources.length).to.equal(1);

    });

});
