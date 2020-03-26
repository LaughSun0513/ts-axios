import axios from '../../src/index';
import qs from 'qs';

// --------1. params 参数是 URLSearchParams 对象类型-------
// http://localhost:8202/paramsSerializer?a=b&c=d
axios.get('/paramsSerializer', {
    params: new URLSearchParams('a=b&c=d')
}).then(res => {
    console.log(res)
})

// --------2. params 参数没有对 [] 转义-------
// http://localhost:8202/paramsSerializer?a=1&b=2&c[]=a&c[]=b&c[]=c
axios.get('/paramsSerializer', {
    params: {
        a: 1,
        b: 2,
        c: ['a', 'b', 'c']
    }
}).then(res => {
    console.log(res)
})


// ------3.params 参数有对 [] 转义--------------
// http://localhost:8202/paramsSerializer?a=1&b=2&c%5B%5D=a&c%5B%5D=b&c%5B%5D=c
const instance = axios.create({
    paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
    }
})
instance.get('/paramsSerializer', {
    params: {
        a: 1,
        b: 2,
        c: ['a', 'b', 'c']
    }
}).then(res => {
    console.log(res)
})