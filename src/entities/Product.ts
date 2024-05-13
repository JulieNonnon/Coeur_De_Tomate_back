import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn({name : "product_id"})    
    id?: number;

    @Column()
    title?: string;

    @Column()
    image?: string;

    @Column()
    small_description?: string;

    @Column()
    long_description?: string;

    @Column()
    price?: number;

    @Column()
    pitch?: string;

    @Column()
    feature1?: string;

    @Column()
    feature2?: string;

    @Column()
    feature3?: string;
}