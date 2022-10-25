import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testando a rota POST", () => {
  afterEach(() => sinon.restore());
  describe("quando faço uma requisição Post", () => {
    it("Testando a rota /login no back-end", async () => {
      const httpResponse = await chai.request(app).post("/login");
      expect(httpResponse).to.equal(201);
    });
  });
});
describe("Testando POST email", () => {
  describe("quando faço uma post para o email incorreto", () => {
    it("Testando a rota /login quando  o email está incorreto no back-end", async () => {
      const httpResponse = await chai
        .request(app)
        .post("/login")
        .send({ email: "adminadmin.com", password: "secret_admin" });
      expect(httpResponse).to.equal(401);
      expect(httpResponse.body).to.deep.equal({message:'Incorrect email or password'})
    });
    it('Testa se retorna o erro 401 quando envia uma requisição com senha incorreta', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
            password: 'secretadmin'
          });
          console.log(httpResponse);
        expect(httpResponse.status).to.be.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
      it('Testa se retorna o erro 400 quando envia uma requisição sem senha', async () => {
        const httpResponse = await chai.request(app).post('/login').send({
              email: 'admin@admin.com'
            });
            console.log(httpResponse);
          expect(httpResponse.status).to.be.equal(400);
          expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
        });
        it('Testa se retorna o erro 400 quando envia uma requisição sem email', async () => {
          const httpResponse = await chai.request(app).post('/login').send({
                password: 'secret_admin'
              });
        
            expect(httpResponse.status).to.be.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
          });
  });
});
describe("Testando a rota Get", () => {
  describe("quando faço uma requisição Get", () => {
    it("Testando a rota /login/validate no back-end", async () => {
      const httpResponse = await chai.request(app).get("/login/validate");
      expect(httpResponse).to.equal(200);
    });
    it('Testa se o endpoint /login/validate retorna um erro ao informar o token invalido', async () => {
      const httpResponse = await chai.request(app).get('/login/validate')
        .set('authorization', 'No token provided');
  
      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.have.property('message');
  });
});
});