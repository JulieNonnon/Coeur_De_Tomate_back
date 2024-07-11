import appDataSource from "../data-source";
import { Product } from "../entities/Product";

class ProductService {

    private productRepository = appDataSource.getRepository(Product);

    async getAll() { // return AppDataSource.query("SELECT * FROM product;");
        console.log(' "All your tomatoes are belong to us." ');
        
        const trucs = this.productRepository.find();

        console.log(trucs, 'les trucs');
        return this.productRepository.find();
        
    }

    async getById(id: number) { // return AppDataSource.query(`SELECT * FROM product WHERE id = ${id};`);
        return this.productRepository.findOneBy({ id: id });
    }

    async create(product: Product) {// AppDataSource.query(`INSERT INTO product (title) VALUES ('${product.title}');`);
        const newProduct = this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }

    async update(id: string, product: Product) { // AppDataSource.query( `UPDATE product SET title = '${product.title}' WHERE id = ${id};`);
        return this.productRepository.update(id, product);
    }

    async delete(id: string) { // AppDataSource.query(`DELETE FROM product WHERE id = ${id};`);
        return this.productRepository.delete(id);
    }

    // async getLastProduct() {
    //     const lastProduct = await this.productRepository.findOne({
    //         order: {
    //             id: 'DESC' // Trie les produits par ID en ordre décroissant
    //         }
    //     });
    //     return lastProduct;
    // }

    async getLastProduct() {
        const query = `
            SELECT *
            FROM products
            ORDER BY id DESC
            LIMIT 1
        `;
        const [lastProduct] = await this.productRepository.query(query);
        return lastProduct;
    }

}

export default ProductService;