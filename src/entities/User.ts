import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Address } from "./Address";


@Entity()
export class User {
  @PrimaryGeneratedColumn({name : "user_id"})
  id?: number;

  @Column({ nullable: false })
  name?: string;

  @Column({ nullable: false })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ nullable: false })
  role?: string;

  @ManyToOne(type => Address, address => address.users)
  @JoinColumn({ name: "address_id" })
  address_id?: Address; 
}