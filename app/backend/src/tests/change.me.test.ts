import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import mockMatches from "./mocks/matches.mock";
import matchesFiltrados from "./mocks/matchesFiltrados";
import matchesFiltradosFalse from "./mocks/matchesFiltradosFalse";
import { app } from "../app";
import Example from "../database/models/ExampleModel";
import * as bcrypt from 'bcryptjs';

import { Response } from "superagent";
import User from "../database/models/Users";
import { truncate } from "fs";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testando a rota POST", () => {
  afterEach(() => sinon.restore());
  describe("quando faço uma requisição Post", () => {
    it("Testando a rota /login no back-end", async () => {
      const httpResponse = await chai.request(app).post("/login");
      expect(httpResponse.status).to.equal(400);
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
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.deep.equal({message:'Incorrect email or password'})
    });
    it('Testa se retorna o erro 400 quando envia uma requisição com senha incorreta', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
            password: 'secretadmin'
          });
          console.log(httpResponse);
        expect(httpResponse.status).to.be.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
      it('Testa se retorna o erro 400 quando envia uma requisição sem senha', async () => {
        const httpResponse = await chai.request(app).post('/login').send({
              email: 'admin@admin.com'
            });
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
      const httpResponse = await chai.request(app).get("/login/validate")
      .set({authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2NjcwOTM4Nn0.rzld95KklKadZGz-5WQDOFZwYvHObmrEUtM944x9oUI'})

      expect(httpResponse.status).to.equal(200);
    });
    it('Testa se o endpoint /login/validate retorna um erro ao informar o token invalido', async () => {
      const httpResponse = await chai.request(app).get('/login/validate')
        .set('authorization', 'No token provided');
  
      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.have.property('message');
  });
 
});
});
describe("Testando a rota Get", () => {
  describe("quando faço uma requisição Get para a rota /matches", () => {
    it("Testando a rota /matches no back-end", async () => {
      const httpResponse = await chai.request(app).get("/matches")  
      expect(httpResponse.status).to.equal(200);
    })
    it("Testando a rota /matches no retorna a lista de times", async () => {
      const httpResponse = await chai.request(app).get("/matches")  
      expect(httpResponse.body).to.deep.equal(mockMatches);
    })
    it("Testando a rota /matches no retorna a lista de times filtrados", async () => {
      const httpResponse = await chai.request(app).get("/matches?inProgress=true")  
      expect(httpResponse.body).to.deep.equal(matchesFiltrados);
    })
    it("Testando a rota /matches no retorna a lista de times filtrados", async () => {
      const httpResponse = await chai.request(app).get("/matches?inProgress=false")  
      expect(httpResponse.body).to.deep.equal(matchesFiltradosFalse);
    })
    it("Testando a rota /matches salvar uma partida com o status de inProgress como true no banco de dados", async () => {
      const mock = {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 8,
        "awayTeamGoals": 2,
        "inProgress": true,
      }
      const httpResponse = await chai.request(app).post("/matches")  
      expect(httpResponse.body).to.deep.equal(mock);
    })
    it("Testando a rota /matches retornando o status 201", async () => {
      const httpResponse = await chai.request(app).get("/")  
      expect(httpResponse.status).to.equal(httpResponse);
    })
  })
});
describe("Testando a rota Get", () => {
  describe("quando faço uma requisição Get para a rota /teams", () => {
    it("Testando a rota /teams no back-end", async () => {
      const httpResponse = await chai.request(app).get("/teams")  
      expect(httpResponse.status).to.equal(200);
    })
    it("Testando a rota /teams se retorna o id do time", async () => {
      const mock = {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      }
      const httpResponse = await chai.request(app).get("/teams/1")  
      expect(httpResponse.body).to.deep.equal(mock);
    })
  })
});