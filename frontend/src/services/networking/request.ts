import jwt_decode from 'jwt-decode';
import { routeDefinitions } from 'routes';
import request from 'superagent';

const baseUrl = process.env.REACT_APP_API_BASE_URL || '';
const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

interface AccessToken {
  exp: number;
}

function update_token(token: string) {
  localStorage.setItem('token', token);
}

function getTimestampInSeconds(): number {
  return new Date().getTime() / 1000;
}

function isTokenValid(token: AccessToken): boolean {
  if (!token.exp) {
    return false;
  }

  return token.exp - getTimestampInSeconds() >= 10;
}

/**
 * This function assess the access token is still valid before calling a requestFunction, if not it refreshes it.
 * In case of error during the refresh process it disconnects the user and redirects him to login page
 * @param requestFunction
 */
const checkAccessToken = async (requestFunction: () => void) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwt_decode<AccessToken>(token) : { exp: 0 };
  if (!isTokenValid(decodedToken)) {
    try {
      const response = await request.post(`${backendBaseUrl}/auth/jwt/refresh`).withCredentials();
      await update_token(response.body.access);
    } catch (e) {
      // TODO: window.location.replace(routeDefinitions.login.path);
    }
  }
  return requestFunction();
};

export const makeGetRequest = async (
  endpoint: string,
  needsAuthentication: boolean,
  data: {} | null = null,
) => {
  let getRequest = request.get(`${baseUrl}${endpoint}`).set('Accept', 'application/json');
  if (data !== null) {
    getRequest = getRequest.query(data);
  }
  if (needsAuthentication) {
    return await checkAccessToken(() => {
      return getRequest.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    });
  } else {
    return getRequest;
  }
};

export const makePostRequest = async (endpoint: string, needsAuthentication: boolean, data: {}) =>{
  const postRequest = request.post(`${baseUrl}${endpoint}`).send(data).set('Accept', 'application/json');
  if (needsAuthentication) {
    return await checkAccessToken(() => {
      return postRequest.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    });
  } else {
    return postRequest;
  }
};

export const makeLoginRequest = (endpoint: string, data: {}) =>
  request
    .post(`${backendBaseUrl}${endpoint}`)
    .send(data)
    .withCredentials();

export const login = async (endpoint: string, data: {}) => {
  const response = await makeLoginRequest(endpoint, data);
  const token: string | undefined = response.body.token || response.body.access;
  if (token) {
    await update_token(token);
  }
  return token;
};
