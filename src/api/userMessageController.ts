// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 此处后端没有提供注释 GET /userMessage/getPage */
export async function getUserMessagePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserMessagePageParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponsePageUserMessage>('/userMessage/getPage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
