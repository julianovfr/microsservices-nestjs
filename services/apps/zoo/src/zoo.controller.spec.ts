import { Test, TestingModule } from '@nestjs/testing';
import { ZooController } from './zoo.controller';
import { ZooService } from './zoo.service';

describe('ZooController', () => {
  let zooController: ZooController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ZooController],
      providers: [ZooService],
    }).compile();

    zooController = app.get<ZooController>(ZooController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(zooController.getHello()).toBe('Hello World!');
    });
  });
});
