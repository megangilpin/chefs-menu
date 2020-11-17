const chai = require("chai");
const chaiHttp = require("chai-http");

const resetDB = require("../scripts/resetDB");
const app = require("../app.js");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);

describe("/GET health", () => {
    it("it should return 200 if the server is running", (done) => {
        chai.request(app)
            .get("/health/")
            .end((err, res) => {
                err && console.error(err);
                res.should.have.status(200);
                res.body.should.have.property("success").eql(true);
                done();
            });
    });
});

// delete everthing in DB to have consistant results in testing
resetDB()
    .then(console.log)
    .then(
        describe("Happy path for a new user", async () => {
            const user = {
                email: "random@somemail.com",
                password: "Absc123456",
            };
            let token;
            const cuisineSpecialty = ["fast food", "Italian"];
            const cuisineSpecialty2 = ["Pizza", "Italian"];
            it("register", (done) => {
                chai.request(app)
                    .post("/auth/register")
                    .send(user)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(201);
                        res.body.should.have.property("user");
                        res.body.user.should.have
                            .property("email")
                            .eql(user.email);
                        res.body.should.have.property("token");
                        expect(res).to.have.cookie("token");
                        done();
                    });
            });
            it("login", (done) => {
                chai.request(app)
                    .post("/auth/login")
                    .send(user)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(200);
                        res.body.should.have.property("user");
                        res.body.user.should.have
                            .property("email")
                            .eql(user.email);
                        res.body.should.have.property("token");
                        expect(res).to.have.cookie("token");
                        token = res.body.token;
                        done();
                    });
            });
            it("ping behind the auth middleware withOUT token", (done) => {
                chai.request(app)
                    .get("/ping")
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(401);
                        done();
                    });
            });
            it("ping behind the auth middleware with token", (done) => {
                chai.request(app)
                    .get("/ping")
                    .set("Cookie", `token=${token}`)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(200);
                        res.body.should.have.property("success").eql(true);
                        done();
                    });
            });
            it("user info", (done) => {
                chai.request(app)
                    .get("/users")
                    .set("Cookie", `token=${token}`)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(200);
                        res.body.should.have.property("email").eql(user.email);
                        res.body.should.have.property("isChef").eql(false);
                        res.body.should.have.property("primaryAddress").eql({});
                        res.body.should.have
                            .property("favoriteCuisine")
                            .eql([]);
                        done();
                    });
            });
            it("check non-existant chef account of the user", (done) => {
                chai.request(app)
                    .get("/chefs")
                    .set("Cookie", `token=${token}`)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(400);
                        res.body.should.have
                            .property("errors")
                            .eql(["Chef profile not found for loggedin user"]);
                        done();
                    });
            });
            it("make chef account for user", (done) => {
                chai.request(app)
                    .post("/chefs")
                    .set("Content-Type", "application/x-www-form-urlencoded")
                    .send({
                        cuisineSpecialty: JSON.stringify(cuisineSpecialty),
                    })
                    .set("Cookie", `token=${token}`)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(200);
                        res.body.should.have
                            .property("cuisineSpecialty")
                            .eql(cuisineSpecialty);
                        done();
                    });
            });
            it("make chef account for user again", (done) => {
                chai.request(app)
                    .post("/chefs")
                    .set("Content-Type", "application/x-www-form-urlencoded")
                    .send({
                        cuisineSpecialty: JSON.stringify(cuisineSpecialty),
                    })
                    .set("Cookie", `token=${token}`)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(400);
                        res.body.should.have
                            .property("errors")
                            .eql(["Chef already exist for loggedin user"]);
                        done();
                    });
            });
            it("update cuisineSpecialty for chef", (done) => {
                chai.request(app)
                    .put("/chefs")
                    .set("Content-Type", "application/x-www-form-urlencoded")
                    .send({
                        cuisineSpecialty: JSON.stringify(cuisineSpecialty2),
                    })
                    .set("Cookie", `token=${token}`)
                    .end((err, res) => {
                        err && console.error(err);
                        res.should.have.status(200);
                        res.body.should.have
                            .property("cuisineSpecialty")
                            .eql(cuisineSpecialty2);
                        done();
                    });
            });
        })
    )
    .catch(console.error);
