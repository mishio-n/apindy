import { Body, Controller, Post } from '@nestjs/common';
import { RaceService } from './race.service';

@Controller('race')
export class RaceController {
  constructor(private service: RaceService) {}

  @Post('base')
  async createBaseRaceData(@Body() body: { title: string; url: string }) {
    const { title, url } = body;
    const raceData = await this.service.createBaseRaceData(url, title);

    return raceData;
  }
}
