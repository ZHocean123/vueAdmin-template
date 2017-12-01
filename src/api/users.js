import request from '@/utils/request'
import store from '@/store'

export function getList(params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}

export function getUserMetaData() {
  return request({
    url: '/api/login',
    method: 'get',
    params: {
      loginName: store.getters.name
    }
  })
}
