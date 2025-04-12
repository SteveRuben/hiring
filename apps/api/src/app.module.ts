import { TalentModule } from '@modules/talents/talent.module';
import { ResponseTimeMiddleware } from '@nest-middlewares/response-time';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import configuration from '@/config/configuration';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
import { AuditLogger } from '@/interceptors/audit-log.interceptor';
import { RateLimitInterceptor } from '@/interceptors/rate-limit.interceptor';
import { ApiLoggerMiddleware } from '@/middleware/api-logger.middleware';
import { JsonBodyMiddleware } from '@/middleware/json-body.middleware';
import { RawBodyMiddleware } from '@/middleware/raw-body.middleware';
import { ApiKeysModule } from '@/modules/api-keys/api-keys.module';
import { ApprovedSubnetsModule } from '@/modules/approved-subnets/approved-subnets.module';
import { AuditLogsModule } from '@/modules/audit-logs/audit-logs.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { PrepAIAuthGuard } from '@/modules/auth/prepai-auth.guard';
import { ScopesGuard } from '@/modules/auth/scope.guard';
import { DomainsModule } from '@/modules/domains/domains.module';
import { EmailsModule } from '@/modules/emails/emails.module';
import { ExperienceRatingsModule } from '@/modules/experience-ratings/experience-ratings.module';
import { GroupsModule } from '@/modules/groups/groups.module';
import { MeetingsModule } from '@/modules/meetings/meetings.module';
import { MembershipsModule } from '@/modules/memberships/memberships.module';
import { MultiFactorAuthenticationModule } from '@/modules/multi-factor-authentication/multi-factor-authentication.module';
import { SessionsModule } from '@/modules/sessions/sessions.module';
import { StripeModule } from '@/modules/stripe/stripe.module';
import { SurveysModule } from '@/modules/surveys/surveys.module';
import { TemplatesModule } from '@/modules/templates/templates.module';
import { UsersModule } from '@/modules/users/users.module';
import { WallpapersModule } from '@/modules/wallpapers/wallpapers.module';
import { WebhooksModule } from '@/modules/webhooks/webhooks.module';
import { WebsocketModule } from '@/modules/websocket/websocket.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { DnsModule } from '@/providers/dns/dns.module';
import { ElasticSearchModule } from '@/providers/elasticsearch/elasticsearch.module';
import { GeolocationModule } from '@/providers/geolocation/geolocation.module';
import { MailModule } from '@/providers/mail/mail.module';
import { S3Module } from '@/providers/s3/s3.module';
import { SharedModule } from '@/providers/shared/shared.module';
import { TasksModule } from '@/providers/tasks/tasks.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import serverConfig from './config/server.config';
import { ChallengeStepModule } from './modules/challenges/challenge.step/challenge.step.module';
import { SubmissionChallengeModule } from './modules/challenges/challenge.submission-challenge/challenge.submission-challenge.module';
import { ChallengeTestCaseController } from './modules/challenges/challenge.test-case/challenge.test-case.controller';
import { ChallengeTestCaseModule } from './modules/challenges/challenge.test-case/challenge.test-case.module';
import { ChallengeTestCaseService } from './modules/challenges/challenge.test-case/challenge.test-case.service';
import { UserChallengeModule } from './modules/challenges/challenge.user-challenge/challenge.user-challenge.module';
import { ChallengesModule } from './modules/challenges/challenge/challenges.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration, serverConfig],
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    TasksModule,
    UsersModule,
    AuthModule,
    MailModule,
    SessionsModule,
    EmailsModule,
    GroupsModule,
    MultiFactorAuthenticationModule,
    ApiKeysModule,
    ApprovedSubnetsModule,
    DomainsModule,
    DnsModule,
    GeolocationModule,
    MembershipsModule,
    StripeModule,
    AuditLogsModule,
    WebhooksModule,
    ElasticSearchModule,
    /* SlackModule,
    AirtableModule, */
    ExperienceRatingsModule,
    SurveysModule,
    SharedModule,
    S3Module,
    MeetingsModule,
    TemplatesModule,
    TalentModule,
    WallpapersModule,
    WebsocketModule,

    ChallengesModule,

    ChallengeStepModule,

    ChallengeTestCaseModule,

    UserChallengeModule,

    SubmissionChallengeModule,
    /*   CloudinaryModule,
    FirebaseModule,
    GitHubModule,
    GoogleMapsModule, */
  ],
  controllers: [AppController, ChallengeTestCaseController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimitInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: PrepAIAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ScopesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogger,
    },
    ChallengeTestCaseService,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/webhooks/stripe',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*')
      .apply(ApiLoggerMiddleware)
      .forRoutes('*')
      .apply(ResponseTimeMiddleware)
      .forRoutes('*');
  }
}
