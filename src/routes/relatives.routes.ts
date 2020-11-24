import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import RelativesController from '../app/controllers/RelativesController';

const relativesRouter = Router();
const relativesController = new RelativesController();
const upload = multer(uploadConfig);

relativesRouter.post('/',
  upload.single('avatar'),
  async (request, response) => {
    try {
      const { name, birthday, relationship, employee_id } = request.body;
      const relative = await relativesController.store({name, birthday, relationship, avatar: request.file.filename, employee_id});
      return response.status(201).json({ ...relative });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

relativesRouter.get('/', async (request, response) => {
  try {
    const relatives = await relativesController.index();
    return response.status(200).json(relatives);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

relativesRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const relative = await relativesController.show(id);
    return response.status(200).json(relative);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

relativesRouter.put('/:id',
  upload.single('avatar'),
  async (request, response) => {
    try {
      const { name, birthday, relationship, employee_id } = request.body;
      const { id } = request.params;
      const relative = await relativesController.update({id, name, birthday, relationship, employee_id, avatar: request.file.filename});
      return response.status(204).json({ ...relative });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

relativesRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await relativesController.delete(id);
    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default relativesRouter;
