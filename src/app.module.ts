import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ContractsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
