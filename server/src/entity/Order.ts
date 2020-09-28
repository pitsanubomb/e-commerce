import { User } from './User';
import { Product } from "./Product";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isPayment: boolean;

  @Column({ default: true })
  isComplete: boolean;

  @Column({ default: false })
  isCancle: boolean;

  @CreateDateColumn({ default: new Date() })
  created_date: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_date: Date;

  @ManyToOne(type => User,user => user.orders)
  user:User;

  @ManyToMany((type) => Product)
  @JoinTable()
  products: Product[];
}
