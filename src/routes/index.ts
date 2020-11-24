import { Router } from 'express';
import employeeRouter from './employee.routes';
import relativesRouter from './relatives.routes';

const routes = Router();

routes.use('/employee', employeeRouter);
routes.use('/relatives', relativesRouter);

export default routes;
