import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/workers',
    method: 'get',
    params
  })
}
