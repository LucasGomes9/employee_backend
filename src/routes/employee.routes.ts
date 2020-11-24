import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import EmployeeController from '../app/controllers/EmployeesController';
import LikeController from '../app/controllers/LikeController';

import validationFields from '../middlewares/validationFields';

const employeeRouter = Router();
const employeeController = new EmployeeController();
const likeController = new LikeController();
const upload = multer(uploadConfig);

employeeRouter.get('/', async (request, response) => {
  try {
    const employees = await employeeController.index();
    return response.status(200).json(employees);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

employeeRouter.post('/', upload.single('avatar'), async (request, response) => {
  try {
    const { name, role, department, email, phone } = request.body;

    const employee = await employeeController.store({name, role, department, email, phone, avatar: request.file.filename});

    return response.status(201).json({ ...employee });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

employeeRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const employee = await employeeController.show(id);



    return response.status(200).json({ ...employee });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

employeeRouter.put('/:id',
  validationFields,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const { id } = request.params;
      const { name, role, department, email, phone } = request.body;
      const employee = await employeeController.update({id, name, role, department, email, phone, avatar: request.file.filename});

      return response.status(200).json({ ...employee });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

employeeRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    await employeeController.delete(id);
    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

employeeRouter.patch('/like/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const likes = await likeController.like(id);
    return response.status(201).json({ likes });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

employeeRouter.patch('/dislike/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const likes = await likeController.dislike(id);
    return response.status(201).json({ "dislikes": likes });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default employeeRouter;
