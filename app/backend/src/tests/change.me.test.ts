import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota POST', async () => {
  it('Testando a rota /login no back-end', async () => {
    const httpResponse = await chai.request(app).post('/login')
    expect(httpResponse).to.equal(201);
  });
});
