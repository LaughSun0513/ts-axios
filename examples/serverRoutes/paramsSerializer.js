const router = require('express').Router();

router.get('/paramsSerializer',(req,res)=>{
    res.json({
        success:'paramsSerializer'
    })
})

module.exports = router;