import request from '@/utils/request'

export function uploadCarousel(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}