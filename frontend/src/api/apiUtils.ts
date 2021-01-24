import axios, { AxiosResponse } from 'axios';

// const baseURL = window.location.origin + '/api/';
const baseURL = 'http://localhost:3000/api/';

export const axiosInstance = axios.create({ baseURL });

export const getData = <T>(promise: Promise<AxiosResponse<T>>) =>
	promise.then((response) => response.data);

export const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const CODE = {
	OK: 0,
	ERROR: 1,
	TOKEN_EXPIRED: 2,
};

export type Response = { message: string; code: 0 | 1 | 2 };
