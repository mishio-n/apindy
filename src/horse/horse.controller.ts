import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { GenderCategory } from '@prisma/client';
import { HorseService } from './horse.service';

@Controller('horse')
export class HorseController {
  constructor(private service: HorseService) {}

  @Post()
  async create(@Body('link') link: string) {
    const result = await this.service.createHorseData(link);
    return result;
  }

  @Get()
  async getSeasonHorses(
    @Query('birthYear') birthYear: string,
    @Query('genderCategory') genderCategory: GenderCategory,
  ) {
    if (isNaN(+birthYear)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const result = await this.service.getHorseDataBySeason(
      +birthYear,
      genderCategory,
    );
    return result;
  }
}
