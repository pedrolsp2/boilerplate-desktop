import instance from '..';

export const welcome = async () => {
  return await instance.get('/');
};
