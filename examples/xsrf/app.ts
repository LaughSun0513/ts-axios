import axios from '../../src/index'

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/xsrf').then(res => {
  console.log(res)
})