import request from 'superagent';

const baseUrl = 'https://api.github.com';
const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

export const makeGetRequest = async (endpoint: string, data: {} | null = null) => {
  if (data === null) {
    return request.get(`${backendBaseUrl}${endpoint}`).set('Accept', 'application/json');
  }

  return request
    .get(`${backendBaseUrl}${endpoint}`)
    .query(data)
    .set('Accept', 'application/json');
};

export const makePostRequest = (endpoint: string, data: {}) =>
  request
    .post(`${backendBaseUrl}${endpoint}`)
    .send(data)
    .set('Accept', 'application/json');

export const makeLoginRequest = (endpoint: string, data: {}) =>
  request.post(`${backendBaseUrl}${endpoint}`).send(data);

export const login = async (endpoint: string, data: {}) => {
  const response = await makeLoginRequest(endpoint, data);
  const token: string | undefined = response.body.token;
  if (token) {
    localStorage.setItem('token', token);
  }
  return token;
};
