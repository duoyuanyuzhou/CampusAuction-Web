// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 此处后端没有提供注释 POST /bidRecord/addBidRecord */
export async function addBidRecord(body: API.BidRecord, options?: { [key: string]: any }) {
  return request<API.ApiResponseBidRecord>('/bidRecord/addBidRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /bidRecord/getBidRecords */
export async function getBidRecords(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBidRecordsParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponseListBidRecord>('/bidRecord/getBidRecords', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /bidRecord/getPage */
export async function getPage1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPage1Params,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponsePageBidRecord>('/bidRecord/getPage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /bidRecord/subscribe */
export async function subscribe(options?: { [key: string]: any }) {
  return request<API.SseEmitter>('/bidRecord/subscribe', {
    method: 'GET',
    ...(options || {}),
  })
}
