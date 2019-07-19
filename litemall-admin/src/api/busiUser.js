import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/busiUser/list',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/busiUser/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/busiUser/update',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/busiUser/delete',
    method: 'post',
    data
  })
}
