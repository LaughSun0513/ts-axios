const router = require('express').Router();

router.get('/base/get', function(req, res) {
    res.json({
        msg:'成功get'
    })
});

// 响应post请求
router.post('/base/post', function(req, res) {
    res.json({
        msg:'成功post'
    })
});

module.exports = router;