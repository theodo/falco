import request from 'superagent';

const baseUrl = 'https://api.github.com';
const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

export const makeGetRequest = async (
  endpoint: string,
  data: {} | null = null,
  token: string | null = null,
) => {
  const req = request.get(`${backendBaseUrl}${endpoint}`).set('Accept', 'application/json');

  if (token !== null) {
    req.set('Authorization', `Bearer ${token}`);
  }

  if (data !== null) {
    req.query(data);
  }
  return req;
};

export const makePostRequest = (endpoint: string, data: {}, token: string | null = null) => {
  const req = request
    .post(`${backendBaseUrl}${endpoint}`)
    .send(data)
    .set('Accept', 'application/json');

  if (token !== null) {
    req.set('Authorization', `Bearer ${token}`);
  }

  return req;
};

export const makeLoginRequest = (endpoint: string, data: {}) =>
  request.post(`${backendBaseUrl}${endpoint}`).send(data);

export const login = async (endpoint: string, data: {}) => {
  const response = await makeLoginRequest(endpoint, data);
  const token: string | undefined = response.body.token || response.body.access;
  if (token) {
    localStorage.setItem('token', token);
  }
  return token;
};
