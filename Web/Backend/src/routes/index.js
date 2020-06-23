import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';

import webRoutes from './web';
import mobileRoutes from './mobile';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * mount user routes at /api/web/*
 */
router.use('/web', webRoutes);

/**
 * mount standard routes at /api/mobile/*
 */

router.use('/mobile', mobileRoutes);

/**
 * POST /api/login - Returns token if correct email and password is provided
 */
router.post('/login', validate(paramValidation.login), authCtrl.login);

export default router;
