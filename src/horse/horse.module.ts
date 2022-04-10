import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { HorseController } from './horse.controller';
import { HorseService } from './horse.service';

@Module({
  providers: [HorseService, PrismaService],
  controllers: [HorseController],
})
export class HorseModule {}
