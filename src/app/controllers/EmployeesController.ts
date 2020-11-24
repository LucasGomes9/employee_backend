import { getRepository } from 'typeorm';
import Employees from '../models/Employees';
import deleteAvatar from '../../utils/deleteAvatar';

interface EmployeeData {
  id?: string;
  name: string;
  role?: string;
  department: string;
  email: string;
  phone: string;
  avatar?: string;
  likes?: number;
  created_at?: Date;
  updated_at?: Date;
}

class EmployeesController {
  async index(): Promise<EmployeeData[]> {
    const employeeRepository = getRepository(Employees);
    const employees = await employeeRepository.find();
    return employees;
  }

  async store({name, role, department, email, phone, avatar}: EmployeeData): Promise<EmployeeData> {
    const employeeRepository = getRepository(Employees);
    const employee = employeeRepository.create({name, role, department, email, phone, avatar});
    const checkIfEmailExist = await employeeRepository.findOne({where: { email }});
    if (checkIfEmailExist) {
      throw new Error('Already exists user with this e-mail');
    }

    await employeeRepository.save(employee);

    return employee;
  }

  async show(id: string): Promise<EmployeeData> {
    const employeeRepository = getRepository(Employees);
    const employee = await employeeRepository.findOne({where: { id }});
    if (!employee) {
      throw new Error('Doesn\'t exists employee with this id');
    }

    return employee;
  }

  async update({id, name, role, department, email, phone, avatar}: EmployeeData): Promise<EmployeeData> {
    const employeeRepository = getRepository(Employees);
    const employee = await employeeRepository.findOne({where: { id }});
    if (!employee) {
      throw new Error('Doesn\'t exists employee with this id');
    }

    await deleteAvatar(employee.avatar);
    if (role && avatar) {
      employee.name = name;
      employee.role = role;
      employee.department = department;
      employee.email = email;
      employee.phone = phone;
      employee.avatar = avatar;
    }

    await employeeRepository.save(employee);

    return employee;
  }

  async delete(id: string): Promise<void> {
    const employeeRepository = getRepository(Employees);
    const employee = await employeeRepository.findOne({where: { id }});
    if (!employee) {
      throw new Error('Doesn\'t exists employee with this id');
    }

    await deleteAvatar(employee.avatar);

    await employeeRepository.delete(id);
  }
}

export default EmployeesController;
