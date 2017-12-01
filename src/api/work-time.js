import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/workingTime',
    method: 'get',
    params
  })
}
