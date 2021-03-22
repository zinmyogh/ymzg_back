import request from '@/utils/request'

export function uploadCarousel(data) {
  console.log(data, 'data')
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}