import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { ContractModule } from './contracts/contract.module';
import { ProfileModule } from './profiles/profile.module';
import { ProfileMiddleware } from './shared/infrastructure/middleware/profile.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ContractModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProfileMiddleware).forRoutes('*');
  }
}
