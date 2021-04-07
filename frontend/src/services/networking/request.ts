import { store } from 'index';
import jwtDecode from 'jwt-decode';
import { logoutUserRequest } from 'redux/login';
import { routeDefinitions } from 'routes';
import request, { Response, SuperAgentRequest } from 'superagent';

const baseUrl = process.env.REACT_APP_API_BASE_URL || '';
const backendBaseUrl = process.env.REACT_APP_API_BASE_URL || '';

interface AccessToken {
  exp: number;
}

export async function updateToken(token: string | undefined): Promise<void> {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
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
const checkAccessToken = async <T>(requestFunction: () => Promise<T>): Promise<T> => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode<AccessToken>(token) : { exp: 0 };
  if (!isTokenValid(decodedToken)) {
    try {
      const response = await request.post(`${backendBaseUrl}/auth/jwt/refresh`).withCredentials();
      await updateToken(response.body.access);
    } catch (e) {
      store.dispatch(logoutUserRequest({ redirectTo: routeDefinitions.landing.path }));
    }
  }

  return await requestFunction();
};

export const makeGetRequest = async (
  endpoint: string,
  needsAuthentication: boolean,
  data: Record<string, unknown> | null = null,
): Promise<Response> => {
  const getRequest = request
    .get(`${baseUrl}${endpoint}`)
    .set('Accept', 'application/json')
    .query(data ?? {});

  if (needsAuthentication) {
    return await checkAccessToken(() => {
      return getRequest.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    });
  } else {
    return getRequest;
  }
};

export const makePostRequest = async (
  endpoint: string,
  needsAuthentication: boolean,
  data: Record<string, unknown>,
): Promise<Response> => {
  const postRequest = request
    .post(`${baseUrl}${endpoint}`)
    .send(data)
    .set('Accept', 'application/json');
  if (needsAuthentication) {
    return await checkAccessToken(() => {
      return postRequest.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    });
  } else {
    return postRequest;
  }
};

export const makePutRequest = async (
  endpoint: string,
  needsAuthentication: boolean,
  data: Record<string, unknown>,
): Promise<Response> => {
  const putRequest = request
    .put(`${baseUrl}${endpoint}`)
    .send(data)
    .set('Accept', 'application/json');
  if (needsAuthentication) {
    return await checkAccessToken(() => {
      return putRequest.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    });
  } else {
    return putRequest;
  }
};

export const makeDeleteRequest = async (
  endpoint: string,
  needsAuthentication: boolean,
): Promise<Response> => {
  const deleteRequest = request.delete(`${baseUrl}${endpoint}`).set('Accept', 'application/json');
  if (needsAuthentication) {
    return await checkAccessToken(() => {
      return deleteRequest.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    });
  } else {
    return deleteRequest;
  }
};

export const makeLoginRequest = (
  endpoint: string,
  data: Record<string, unknown>,
): SuperAgentRequest => request.post(`${backendBaseUrl}${endpoint}`).send(data).withCredentials();

export const login = async (endpoint: string, data: Record<string, unknown>): Promise<boolean> => {
  const response = await makeLoginRequest(endpoint, data);
  const token: string | undefined = response.body.token || response.body.access;
  if (token) {
    await updateToken(token);

    return true;
  }

  return false;
};

export const makeLogoutRequest = (endpoint: string): SuperAgentRequest =>
  request.post(`${backendBaseUrl}${endpoint}`).withCredentials();

export const logout = async (endpoint: string): Promise<boolean> => {
  const response = await makeLogoutRequest(endpoint);
  await updateToken(undefined);

  return !!response;
};
