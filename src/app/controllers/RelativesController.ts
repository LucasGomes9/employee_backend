import { getRepository } from 'typeorm';
import deleteAvatar from '../../utils/deleteAvatar';

import Relatives from '../models/Relatives';
import Employees from '../models/Employees';

import convertDateStringForTimestamp from '../../utils/convertDateStringForTimestamp';

interface RelativesRequest {
  id?: string;
  name: string;
  birthday: number;
  relationship: number;
  avatar: string;
  employee_id: string;
}

interface RelativesResponse {
  id?: string;
  name: string;
  birthday: number;
  relationship: number;
  avatar: string;
  employee_id: string;
  created_at?: Date;
  updated_at?: Date;
}

class RelativesController {
  async store({name, birthday, relationship, avatar, employee_id}: RelativesRequest): Promise<RelativesResponse> {
    const employeeRepository = getRepository(Employees);
    const relativeRepository = getRepository(Relatives);

    const employee = await employeeRepository.findOne({where: { id: employee_id }});
    if (!employee) {
      throw new Error('Doesn\'t exists employee with this id');
    }

    const date = convertDateStringForTimestamp(`${birthday}`);

    if (!date) {
      throw new Error(' Invalid Date, use DD/MM/AAAA format');
    }
    const relatives = relativeRepository.create({name, birthday: date, relationship, avatar, employee_id});
    await relativeRepository.save(relatives);

    return relatives;
  }

  async index(): Promise<RelativesResponse[]> {
    const relativesRepository = getRepository(Relatives);
    const relatives = await relativesRepository.find();
    return relatives;
  }

  async show(id: string): Promise<RelativesResponse> {
    const relativesRepository = getRepository(Relatives);
    const relatives = await relativesRepository.findOne({where: { id }});

    if (!relatives) {
      throw new Error('Doesn\'t exists relative with this id');
    }

    return relatives;
  }

  async update({id, name, birthday, relationship, avatar, employee_id}: RelativesRequest): Promise<RelativesResponse> {
    const employeeRepository = getRepository(Employees);
    const relativesRepository = getRepository(Relatives);
    const relatives = await relativesRepository.findOne({where: { id }});

    if (!relatives) {
      throw new Error('Doesn\'t exists relative with this id');
    }

    const employee = await employeeRepository.findOne({where: { id: employee_id }});
    if (!employee) {
      throw new Error('Doesn\'t exists employee with this id');
    }

    await deleteAvatar(relatives.avatar);

    const date = convertDateStringForTimestamp(`${birthday}`);

    if (!date) {
      throw new Error('Invalid Date, use DD/MM/AAAA format');
    }
    relatives.name = name;
    relatives.birthday = date;
    relatives.relationship = relationship;
    relatives.avatar = avatar;
    relatives.employee_id = employee_id;

    await relativesRepository.save(relatives);

    return relatives;
  }

  async delete(id: string): Promise<void> {
    const relativesRepository = getRepository(Relatives);

    const relatives = await relativesRepository.findOne({where: { id }});

    if (!relatives) {
      throw new Error('Doesn\'t exists relative with this id');
    }

    await deleteAvatar(relatives.avatar);

    await relativesRepository.delete(id);
  }
}

export default RelativesController;
