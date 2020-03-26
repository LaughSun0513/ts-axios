const router = require('express').Router();
const atob = require('atob');

router.post('/auth', function (req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log(atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'Auth' && password === '123456') {
        res.json({
            b:'2222'
        })
    } else {
        res.end('UnAuthorization')
    }
});
module.exports = router;