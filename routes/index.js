const Router = require('express');
const router = Router();

const adminRouter = require('./adminRouter');
const contactsRouter = require('./contactsRouter');
const projectRouter = require('./projectRouter');
const serviseRouter = require('./serviseRouter');
const sliderRouter = require('./sliderRouter');
const systemRouter = require('./systemRouter');
const vacancyRouter = require('./vacancyRouter');

router.use('/admin', adminRouter);
router.use('/contacts', contactsRouter);
router.use('/project', projectRouter);
router.use('/servise', serviseRouter);
router.use('/slider', sliderRouter);
router.use('/system', systemRouter);
router.use('/vacancy', vacancyRouter);

module.exports = router;