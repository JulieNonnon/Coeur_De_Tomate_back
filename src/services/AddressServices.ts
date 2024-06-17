import appDataSource from "../data-source";
import { Address } from "../entities/Address";

class AddressService {

    private addressRepository = appDataSource.getRepository(Address);

    async getById(id: number) { // return AppDataSource.query(`SELECT * FROM address WHERE id = ${id};`);
        return this.addressRepository.findOneBy({ id: id });
    }

    async create(address: Address) {// AppDataSource.query(`INSERT INTO address (city) VALUES ('${product.city}');`);
        const newAddress = this.addressRepository.create(address);
        return this.addressRepository.save(newAddress);
    }

    async update(id: string, address: Address) { // AppDataSource.query( `UPDATE address SET city = '${address.city}' WHERE id = ${id};`);
        return this.addressRepository.update(id, address);
    }

    async delete(id: string) { // AppDataSource.query(`DELETE FROM address WHERE id = ${id};`);
        return this.addressRepository.delete(id);
    }

}

export default AddressService;