import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Address } from "./Address";


@Entity()
export class User {
  @PrimaryGeneratedColumn({name : "user_id"})
  id?: number;

  @Column({ nullable: false })
  name?: string;

  @Column({ nullable: false, unique: true })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ default: false, name: "is_admin" }) // Par défaut, un utilisateur n'est pas un administrateur
  is_admin?: boolean;

  @ManyToOne(type => Address, address => address.users)
  @JoinColumn({ name: "address_id" })
  address_id?: Address; 
}