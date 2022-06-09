const { Router } = require('express');
const taskRoute = require('./taskRoute');
const router = Router();

router.get('/', (req, res) => {
    res.render('home');
})

router.use(taskRoute);
router.use((req, res, next) => {
    res.json({ message: 'Something is wrong' });
})

module.exports = router;
