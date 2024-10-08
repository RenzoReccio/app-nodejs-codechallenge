import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [TestModule, ApplicationModule, InfrastructureModule, DomainModule, PresentationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
