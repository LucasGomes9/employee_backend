import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Employees from './Employees';

@Entity('relatives')
class Relatives {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday: number;

  @Column('int')
  relationship: number;

  @Column()
  avatar: string;

  @Column('uuid')
  employee_id: string;

  @ManyToOne(() => Employees)
  @JoinColumn({ name: 'employee_id' })
  employee_id_ref: Employees;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Relatives;
