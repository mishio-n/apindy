import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { generateRandomAlphanumeric } from './logic/generateRandomAlphanumeric';
import { getRaceData } from './logic/getRaceData';

@Injectable()
export class RaceService {
  constructor(private prisma: PrismaService) {}

  async getRaceTemplates() {
    return this.prisma.raceTemplate.findMany();
  }

  async getRaceTemplate(id: string) {
    return this.prisma.raceTemplate.findUnique({
      where: {
        id,
      },
    });
  }

  async createRaceTemplate(url: string, title: string) {
    const { id, ...raceData } = await getRaceData(url);

    const result = await this.prisma.raceTemplate.create({
      data: {
        id,
        json: JSON.stringify({ ...raceData, title }),
      },
    });

    return result;
  }

  async getRaceTierList(id: string) {
    return this.prisma.raceTierList.findUnique({
      where: {
        id,
      },
    });
  }

  async createRaceTierList(json: any) {
    const id = generateRandomAlphanumeric();
    return this.prisma.raceTierList.create({
      data: {
        id,
        json: JSON.stringify(json),
      },
    });
  }
}
