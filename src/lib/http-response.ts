import { headers } from '../shared/headers';

interface HTTPResponse {
  statusCode: number;
  body: string;
  headers: { [key: string]: string };
}

/**
 * Return 200 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Success']
 * @returns {HTTPResponse}
 */
function Success(body: string | { [key: string]: any } = 'Success'): HTTPResponse {
  const responseBody = typeof body === 'string' ? body : JSON.stringify(body);

  return {
    statusCode: 200,
    body: responseBody,
    headers: headers
  };
}

/**
 * Return 404 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Not Found']
 * @returns {HTTPResponse}
 */
function NotFound(body: string | { [key: string]: any } = 'Not Found'): HTTPResponse {
  const responseBody = typeof body === 'string' ? body : JSON.stringify(body);

  return {
    statusCode: 404,
    body: responseBody,
    headers: headers
  };
}

/**
 * Return 403 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Not Found']
 * @returns {HTTPResponse}
 */
function Forbidden(body: string | { [key: string]: any } = 'Forbidden'): HTTPResponse {
  const responseBody = typeof body === 'string' ? body : JSON.stringify(body);

  return {
    statusCode: 403,
    body: responseBody,
    headers: headers
  };
}

/**
 * Return Generic HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Not Found']
 * @returns {HTTPResponse}
 */
function Generic(statusCode: number, body: string | { [key: string]: any } = ''): HTTPResponse {
  const responseBody = typeof body === 'string' ? body : JSON.stringify(body);

  return {
    statusCode,
    body: responseBody,
    headers: headers
  };
}

export default {
  NotFound,
  Success,
  Forbidden,
  Generic
};
