import { Test, TestingModule } from '@nestjs/testing';
import { AutoroleController } from './autorole.controller';

describe('AutoroleController', () => {
  let controller: AutoroleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoroleController],
    }).compile();

    controller = module.get<AutoroleController>(AutoroleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
