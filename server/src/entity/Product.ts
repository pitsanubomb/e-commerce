import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  detail: string;

  @Column({ type: "decimal" })
  prize: number;

  @Column()
  count: number;

  @Column({ type: "boolean" })
  isShipping: boolean;
}
