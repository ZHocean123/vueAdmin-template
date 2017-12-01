import request from '@/utils/request'

export function login(loginName, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      loginName,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}
