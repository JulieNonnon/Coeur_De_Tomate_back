import { expect } from 'chai'; // for assertions
import sinon from 'sinon'; // for mock and spies
import appDataSource from '../src/data-source';
import ProductService from '../src/services/ProductServices';
import { Repository } from 'typeorm';
import { Product } from '../src/entities/Product';
import { afterEach, beforeEach, describe, it } from 'node:test';

describe('ProductServices', () => {
  let productService: ProductService;
  let productRepositoryStub: sinon.SinonStubbedInstance<Repository<Product>>;

  beforeEach(() => {
    productRepositoryStub = sinon.createStubInstance(Repository) as unknown as sinon.SinonStubbedInstance<Repository<Product>>;
    sinon.stub(appDataSource, 'getRepository').returns(productRepositoryStub as unknown as Repository<Product>);
    productService = new ProductService();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getById', () => {
    it('should return the product if the product exists', async () => {
      // Given
      const productId = 1;
      const expectedProduct = { id: productId, name: 'Test Product' } as Product;
      productRepositoryStub.findOneBy.resolves(expectedProduct);

      // When
      const result = await productService.getById(productId);

      // Then
      expect(productRepositoryStub.findOneBy.calledOnceWith({ id: productId })).to.be.true;
      expect(result).to.equal(expectedProduct);
    });

    it('should return null when the product does not exist', async () => {
      // Given
      const productId = 2;
      productRepositoryStub.findOneBy.resolves(null);

      // When
      const result = await productService.getById(productId);

      // Then
      expect(productRepositoryStub.findOneBy.calledOnceWith({ id: productId })).to.be.true;
      expect(result).to.be.null;
    });
  });
});