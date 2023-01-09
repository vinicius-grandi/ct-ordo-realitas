/// <reference types="node" />
import api from '@ct-ordo-realitas/app/firebase/serverApp';
import imgbb, { ImgbbResponse } from 'imgbb-uploader';
import testClient from '../utils/testClient';
import AddNewRitual from '../../pages/api/rituais/adicionar';

jest.mock('@ct-ordo-realitas/app/firebase/serverApp', () => ({
  isUserAdmin: () => Promise.resolve(true),
  setRitual: () => Promise.resolve(),
}));
jest.mock('imgbb-uploader');
jest.mock('../../lib/getFormData');

const mockedImgbb = imgbb as jest.Mock<Promise<Partial<ImgbbResponse>>>;

describe('Rituals API', () => {
  const request = testClient(AddNewRitual);
  const isUserAdmin = jest.spyOn(api, 'isUserAdmin');
  it('should let you create a ritual when everything is fine', async () => {
    mockedImgbb.mockImplementation(() => Promise.resolve({ display_url: 'none' }));
    const response = await request.post('/api/rituais/adicionar').set('Cookie', ['session=a']);
    expect(response.statusCode).toBe(200);
  });
  it('returns status code 401 when user is not admin', async () => {
    isUserAdmin.mockImplementation(() => Promise.resolve(false));
    const response = await request.post('/api/rituais/adicionar').set('Cookie', ['session=a']);
    expect(response.statusCode).toBe(401);
  });
  it('returns status code 500 when something goes wrong on server side', async () => {
    isUserAdmin.mockImplementation(() => Promise.resolve(true));
    const response = await request.post('/api/rituais/adicionar').set('Cookie', ['session=a', 'error=cu']);
    expect(response.statusCode).toBe(500);
  });
  it('returns error when method doesn\'t exist', async () => {
    const response = await request.get('/api/rituais/adicionar');
    expect(response.statusCode).toBe(405);
  });
});
