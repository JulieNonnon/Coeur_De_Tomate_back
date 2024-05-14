import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Address {

    @PrimaryGeneratedColumn({name : "address_id"})    
    id?: number;

    @Column({ nullable: false })
    streetnbr?: number;

    @Column({ nullable: false })
    streetname?: string;

    @Column()
    details?: string;

    @Column({ nullable: false })
    postalcode?: string;

    @Column({ nullable: false })
    city?: string;

    @Column({ nullable: false })
    country?: string;

    @OneToMany(type => User, user => user.address_id)
    users?: User[]; // Relation inverse vers User

}