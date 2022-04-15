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

const isGenderCategory = (arg: string): arg is GenderCategory => {
  switch (arg.toUpperCase()) {
    case GenderCategory.MALE:
    case GenderCategory.FEMALE:
      return true;
    default:
      return false;
  }
};

@Controller('horses')
export class HorseController {
  constructor(private service: HorseService) {}

  @Post()
  async create(@Body('link') link: string) {
    const result = await this.service.createHorseData(link);
    return result;
  }

  @Get()
  async getSeasonHorses(
    @Query('birthyear') birthYear: string,
    @Query('gendercategory') genderCategory: string,
  ) {
    const upperCasedGenderCategory = genderCategory.toUpperCase();
    if (isNaN(+birthYear)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    if (!isGenderCategory(upperCasedGenderCategory)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }

    const result = await this.service.getHorseDataBySeason(
      +birthYear,
      upperCasedGenderCategory,
    );
    return result;
  }
}
