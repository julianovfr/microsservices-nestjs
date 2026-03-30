import { Module } from '@nestjs/common';
import { ZooController } from './zoo.controller';
import { ZooService } from './zoo.service';

@Module({
  imports: [],
  controllers: [ZooController],
  providers: [ZooService],
})
export class ZooModule {}
