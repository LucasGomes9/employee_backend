import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('employees')
class Employees {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  department: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;

  @Column('int')
  likes: number;

  @Column('int')
  dislikes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Employees;
