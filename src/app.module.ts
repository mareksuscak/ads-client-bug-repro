import { Module } from '@nestjs/common';
import { PlcModule } from './plc';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PlcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
