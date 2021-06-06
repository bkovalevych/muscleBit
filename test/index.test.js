const app = require('../index');
const request = require('supertest');
const assert = require('assert');


describe("most meaningful scenarios of api", () => {
    it('Alive probe', (done) => {
        request(app).get("/")
            .expect(200, "Alive", done);
    });

    it("try to login without token", (done) => {
        request(app).get("/user/sign")
            .expect(400, {errors: "Error: Request failed with status code 400"}, done);
    })
    it("try to login with broken token", (done) => {
        request(app).get("/user/sign/?googleToken=hello")
            .expect(400, {errors: 'Error: Request failed with status code 400'}, done);
    })
})

