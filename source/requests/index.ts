import axios from 'axios';
import RequestError from './requestError';

const improveErrorMessage = (error: any, url?, method?) => {
  let code =
    error.status ||
    error.statusCode ||
    error.request?.statusCode ||
    error.response?.statusCode ||
    error.response?.status;
  let codeText =
    error.statusText ||
    error.request?.statusText ||
    error.response?.statusText ||
    error.response?.name ||
    error.request?.name ||
    error.name ||
    '';
  let response =
    (typeof error.response === 'string' && error.response) ||
    error.responseText ||
    error.request?.response ||
    error.request?.responseText ||
    error.response?.response ||
    error.response?.responseText ||
    error.message ||
    '{}';
  console.error('AN ERROR:', error, url, method);

  try {
    response = JSON.parse(response);
  } catch (error) {
    console.error('Error response:', error);
    response = response;
  }

  for (const key in error) {
    if (Object.prototype.hasOwnProperty.call(error, key)) {
      const element = error[key];
      console.error(key, element);
    }
  }

  if (code === undefined || code === null || code === '') {
    code = 400;
    if (url.includes('wroom') || url.includes('user') || url.includes('auth')) {
      code = 503;
    }
    codeText = 'CORS Error:' + codeText;
    response = 'CORS Error:' + response;
  }

  return new RequestError(code, codeText, response);
};

const request = async (
  address?: string,
  method?: string,
  path?: string,
  token?: string,
  data?,
  clearBaseURL: boolean = false,
  page?: number,
  pageSize?: number,
  noCache?: boolean,
  replaceHeaders?
) => {
  let http = '';
  if (!address) {
    address = 'localhost';
  }
  if (!method) {
    method = 'get';
  }
  let url = address + (path ? path : '');
  try {
    if (
      url !== '/api/token' &&
      !url.includes('//') &&
      !url.includes('http://') &&
      !url.includes('https://')
    ) {
      http = 'https://';
      if (url.includes('localhost')) http = 'http://';
    }
    let config: { headers: {}; data?: {} } = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: '*/*',
      },
    };

    if (token !== undefined && token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (page !== undefined && page !== null) {
      config.headers['page'] = page;
    }
    if (pageSize !== undefined && pageSize !== null) {
      config.headers['pageSize'] = pageSize;
    }
    if (noCache) {
      // config.headers['Cache-Control'] = 'no-cache no-store';
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      config.headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
      // config.headers['cache-control'] = 'public, max-age=0, must-revalidate';
      config.headers['If-Modified-Since'] = yesterday.toDateString();
      config.headers['if-None-Match'] = undefined;
    }

    if (replaceHeaders) {
      config = {
        headers: replaceHeaders,
      };
    }

    config =
      method === 'get' ||
      method === 'delete' ||
      method === 'head' ||
      method === 'options'
        ? { ...config, data: data }
        : config;

    const param2 =
      method === 'get' ||
      method === 'delete' ||
      method === 'head' ||
      method === 'options'
        ? clearBaseURL
          ? undefined
          : config
        : data;

    const param3 = clearBaseURL ? undefined : config;

    url = http + url;
    const received = await axios[method](url, param2, param3);
    if (noCache) {
      console.error('noCache END');
      console.error('received header', received, received.headers);
      // console.error('received header', received.get('pages'));
      // console.error('received header get', received.headers.get('pages'));
    }

    return received;
  } catch (error: any) {
    error = improveErrorMessage(error, url, method);

    if (error.code >= 500 && error.code < 600) {
      console.error('CodeError:', error);
      return await request(
        address,
        method,
        path,
        token,
        data,
        clearBaseURL,
        page,
        pageSize
      );
    } else {
      console.error('Error:', error);
      console.error(error);
      throw error;
    }
  }
};

export { request };
