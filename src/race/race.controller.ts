import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RaceService } from './race.service';

@Controller('race')
export class RaceController {
  constructor(private service: RaceService) {}

  @Get('templates')
  async getRaceTemplates() {
    const templates = await this.service.getRaceTemplates();
    return templates;
  }

  @Get('templates/:id')
  async getRaceTemplate(@Param('id') id: string) {
    const template = await this.service.getRaceTemplate(id);
    if (template === undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return template;
  }

  @Post('templates')
  async createRaceTemplate(@Body() body: { title: string; url: string }) {
    const { title, url } = body;
    const template = await this.service.createRaceTemplate(url, title);

    return template;
  }

  @Get('tierlists/:id')
  async getRaceTierList(@Param('id') id: string) {
    const tierList = await this.service.getRaceTierList(id);
    if (tierList === undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return tierList;
  }

  @Post('tierlists')
  async createRaceTierList(@Body() body: any) {
    const tierList = await this.service.createRaceTierList(body);

    return tierList;
  }
}
