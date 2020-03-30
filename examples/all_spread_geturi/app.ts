import axios from '../../src/index';

function getA() {
    return axios.get('/base/get')
}

function getB() {
    return axios({
        method: "post",
        url: "/base/post",
        data: {
            defaultHeaders: "default have headers",
        }
    });
}

axios.all([getA(), getB()])
    .then(axios.spread(function(resA, resB) {
        console.log('==spread resA=='+JSON.stringify(resA.data))
        console.log('==spread resB=='+JSON.stringify(resB.data))
}))

axios.all([getA(), getB()])
    .then(([resA, resB]) => {
        console.log('=====resA====='+JSON.stringify(resA.data))
        console.log('=====resB====='+JSON.stringify(resB.data))
})

const fakeConfig = {
    baseURL: 'https://www.baidu.com/',
    url: '/user/12345',
    params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
    }
}
console.log('=====getUri======='+axios.getUri(fakeConfig))