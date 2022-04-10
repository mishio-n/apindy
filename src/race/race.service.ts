import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { getRaceData } from './logic/getRaceData';

@Injectable()
export class RaceService {
  constructor(private prisma: PrismaService) {}

  async createBaseRaceData(url: string, title: string) {
    const { id, ...raceData } = await getRaceData(url);

    const result = await this.prisma.race.create({
      data: {
        id,
        json: JSON.stringify({ ...raceData, title }),
      },
    });

    return result;
  }
}
