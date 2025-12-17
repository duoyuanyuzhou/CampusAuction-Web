// @ts-ignore
/* eslint-disable */
import request from '@/request.ts'

/** 此处后端没有提供注释 GET /orderInfo/getPage */
export async function getOrderInfoVoPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderInfoVoPageParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiResponsePageOrderInfoVo>('/orderInfo/getPage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /orderInfo/payOrder/${param0} */
export async function payOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.payOrderParams,
  body: API.OrderInfoVo,
  options?: { [key: string]: any }
) {
  const { orderId: param0, ...queryParams } = params
  return request<API.ApiResponseOrderInfoVo>(`/orderInfo/payOrder/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  })
}
