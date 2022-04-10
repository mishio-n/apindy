import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HorseModule } from './horse/horse.module';
import { RaceModule } from './race/race.module';

@Module({
  imports: [HorseModule, RaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
