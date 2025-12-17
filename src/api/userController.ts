// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 此处后端没有提供注释 POST / */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponse>('/', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /getUser */
export async function getUser(options?: { [key: string]: any }) {
  return request<API.ApiResponseUser>('/getUser', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /getUserList */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseIPageUser>('/getUserList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /login */
export async function loginUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ApiResponseUser>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /register */
export async function registerUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PUT /updateUser */
export async function updateUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/updateUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
