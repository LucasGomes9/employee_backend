import { getRepository } from 'typeorm';
import Employees from '../models/Employees';

class LikeController {
  async like(id: string): Promise<number> {
    const employeeRepository = getRepository(Employees);
    const employee = await employeeRepository.findOne({where: { id }});
    if (!employee) {
      throw new Error('Doesn\'t exists employee with this id');
    }

    employee.likes += 1;

    employeeRepository.save(employee);

    return employee.likes;
  }

  async dislike(id: string): Promise<number> {
    const employeeRepository = getRepository(Employees);
    const employee = await employeeRepository.findOne({where: { id }});
    if (!employee) {
      throw new Error('Doesn\'t exists employee with this id');
    }

    employee.dislikes -= 1;

    employeeRepository.save(employee);

    return employee.dislikes;
  }
}

export default LikeController;
