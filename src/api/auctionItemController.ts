// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 此处后端没有提供注释 POST /addAuctionItem */
export async function addAuctionItem(body: API.AuctionItem, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/addAuctionItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /auctionItem/${param0} */
export async function getAuctionItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuctionItemParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ApiResponse>(`/auctionItem/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 DELETE /delete/${id} */
export async function deleteAuctionItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAuctionItemParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponse>(`/delete/${id}`, {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /getPage */
export async function getPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponse>('/getPage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /getPageByAdmin */
export async function getPageByAdmin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageByAdminParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponse>('/getPageByAdmin', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /getPageByUser */
export async function getPageByUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageByUserParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponse>('/getPageByUser', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /reviewAuctionItem */
export async function reviewAuctionItem(body: API.AuctionItem, options?: { [key: string]: any }) {
  return request<API.ApiResponse>('/reviewAuctionItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 PUT /update/${param0} */
export async function updateAuctionItem(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAuctionItemParams,
  body: API.AuctionItem,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params
  return request<API.ApiResponse>(`/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}
