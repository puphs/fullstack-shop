import axios, { AxiosResponse } from 'axios';

const baseURL = process.env.REACT_APP_API_URL ?? window.location.origin + '/api/';

export const axiosInstance = axios.create({ baseURL });

export const getData = <T>(promise: Promise<AxiosResponse<T>>) =>
	promise.then((response) => response.data);

export const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export enum Code {
	OK = 0,
	ERROR = 1,
	TOKEN_EXPIRED = 2,
}

export type Response<D = { [key: string]: any }> = { data: D; message: string; code: Code };
