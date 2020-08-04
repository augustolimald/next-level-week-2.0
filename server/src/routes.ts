import { Router } from 'express';
import ClassController from './controllers/ClassController';
import ConnectionController from './controllers/ConnectionController';

const routes = Router();

/**
 * Rotas referentes às aulas
 */
routes.get('/classes', ClassController.index);
routes.post('/classes', ClassController.store);

/**
 * Rotas referentes às conexões
 */
routes.get('/connections', ConnectionController.index);
routes.post('/connections', ConnectionController.store);

export default routes;