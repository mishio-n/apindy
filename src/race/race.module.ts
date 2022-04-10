import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { RaceController } from './race.controller';
import { RaceService } from './race.service';

@Module({
  controllers: [RaceController],
  providers: [RaceService, PrismaService],
})
export class RaceModule {}
