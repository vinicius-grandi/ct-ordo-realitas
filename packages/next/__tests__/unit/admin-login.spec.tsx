/// <reference types="node" />
import api from '@ct-ordo-realitas/app/firebase/serverApp';
import testClient from '../utils/testClient';
import Login from '../../pages/api/login';

jest.mock('@ct-ordo-realitas/app/firebase/serverApp', () => ({
  createSessionCookie: () => Promise.resolve(''),
}));
jest.mock('../../lib/getFormData');
jest.mock('../../lib/csrf');

describe('Rituals API', () => {
  const request = testClient(Login);
  const createSessionCookie = jest.spyOn(api, 'createSessionCookie');
  it('should let you login', async () => {
    const response = await request.post('/api/login');
    expect(response.statusCode).toBe(200);
  });
  it('should not let you when promise is rejected', async () => {
    createSessionCookie.mockImplementation(() => Promise.reject(Error('fake error')));
    const response = await request.post('/api/login');
    expect(response.statusCode).toBe(500);
  });
});
