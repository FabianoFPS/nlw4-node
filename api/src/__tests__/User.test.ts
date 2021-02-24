import request from 'supertest';

import createConnection from '../database';
import { app } from '../app';
import { ConnectionIsNotSetError } from 'typeorm';

describe('User', function (){
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new user', async () => {
    request(app)
      .post('/users')
      .send({
        name: 'Name example',
        email: 'example@email.com',
    });
  })
});