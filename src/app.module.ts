import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { ContractsModule } from './contracts/contracts.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProfileMiddleware } from './shared/infrastructure/middleware/profile.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ContractsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProfileMiddleware).forRoutes('*');
  }
}
