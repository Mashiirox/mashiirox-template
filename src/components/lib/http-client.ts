import qs from 'qs';
import { message } from 'antd';

import history from '@/utils/history';
import store from '@/stores/global-store';

function getTimeZone(): string {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  if (offset === 0) {
    return 'UTC+0';
  }

  const delta = Math.abs(offset) / 60;

  if (offset > 0) {
    return `UTC-${delta}`;
  }

  return `UTC+${delta}`;
}

const TIME_ZONE = getTimeZone();

type METHOD = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

const HEADERS: Record<string, string> = {
  'X-Proxy': 'API',
  'X-Timezone': TIME_ZONE,
  'Content-Type': 'application/json',
};

export async function request<TData>(path: string, method: METHOD, body?: unknown): Promise<TData> {
  const requestInit: RequestInit = {
    method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
    headers: HEADERS,
  };

  const { setIsLogin } = store;

  const response = await fetch(path, requestInit);
  const { status, statusText } = response;

  if (status === 900) {
    message.error('当前会话已失效，请重新登录!');
    localStorage.setItem('isLogin', '0');
    setIsLogin(false);
    history.replace('/login');

    return Promise.reject(new Error('当前会话已失效，请重新登录!'));
  } else if (status < 200 || status >= 400) {
    message.error(statusText);

    return Promise.reject(new Error(statusText));
  }

  return await response.json();
  // const { code, note } = resp;
  // if (code < 0) {
  //   message.error(note);

  //   return Promise.reject(new Error(note));
  // }

  // return resp as unknown as TData;
}

function httpClient<TData>(path: string, body?: unknown): Promise<TData> {
  return httpClient.post<TData>(path, body || {});
}

httpClient.get = function <TData>(path: string, query?: Record<string, unknown>): Promise<TData> {
  let _path = path;
  if (query) {
    _path = `${_path}?${qs.stringify(query)}`;
  }

  return request<TData>(_path, 'GET', undefined);
};

httpClient.post = function <TData>(path: string, body: unknown): Promise<TData> {
  return request<TData>(path, 'POST', body);
};

httpClient.put = function <TData>(path: string, body: unknown): Promise<TData> {
  return request<TData>(path, 'PUT', body);
};

httpClient.delete = function <TData>(path: string, body?: unknown): Promise<TData> {
  return request<TData>(path, 'DELETE', body);
};

httpClient.patch = function <TData>(path: string, body?: unknown): Promise<TData> {
  return request<TData>(path, 'PATCH', body);
};

export default httpClient;
