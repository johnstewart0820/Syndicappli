import express from 'express';
import adminRoutes from './admin.route';
import managerRoutes from './manager.route';
import ownerRoutes from './owner.route';

const router = express.Router(); // eslint-disable-line new-cap

// mount user admin routes at /admin
router.use('/admin', adminRoutes);

// mount manager routes at /manager
router.use('/manager', managerRoutes);

// mount owner routes at /owner
router.use('/owner', ownerRoutes);

export default router;
