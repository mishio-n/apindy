import { Injectable } from '@nestjs/common';
import { GenderCategory } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { getHorseData } from './logic/getHorseData';

@Injectable()
export class HorseService {
  constructor(private prisma: PrismaService) {}

  async getHorseDataBySeason(
    birthYear: number,
    genderCategory?: GenderCategory,
  ) {
    const result = await this.prisma.horse.findMany({
      where: {
        birthYear,
        genderCategory,
      },
    });

    return result;
  }

  async createHorseData(link: string) {
    const { ownerName, stableName, stableRegion, ...horseData } =
      await getHorseData(link);

    const owner = await this.prisma.owner.findUnique({
      where: { name: ownerName },
    });

    const stable = await this.prisma.stable.findUnique({
      where: {
        name: stableName,
      },
    });

    const result = await this.prisma.horse.create({
      data: {
        ...horseData,
        owner: owner
          ? { connect: { id: owner.id } }
          : { create: { name: ownerName } },
        link,
        stable: stable
          ? { connect: { id: stable.id } }
          : {
              create: {
                name: stableName,
                region: stableRegion,
              },
            },
      },
    });

    return result;
  }
}
