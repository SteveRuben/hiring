import { ApiKeysModule } from '@modules/api-keys/api-keys.module';
import { ApprovedSubnetsModule } from '@modules/approved-subnets/approved-subnets.module';
import { ApprovedSubnetsService } from '@modules/approved-subnets/approved-subnets.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '@/prisma/prisma.module';
import { GeolocationModule } from '@/providers/geolocation/geolocation.module';
import { MailModule } from '@/providers/mail/mail.module';
import { PwnedModule } from '@/providers/pwned/pwned.module';
import { TokensModule } from '@/providers/tokens/tokens.module';
import { TwilioModule } from '@/providers/twilio/twilio.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrepaiStrategy } from './prepai.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PrismaModule,
    MailModule,
    TokensModule,
    ConfigModule,
    PwnedModule,
    ApiKeysModule,
    TwilioModule,
    GeolocationModule,
    ApprovedSubnetsModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, PrepaiStrategy, ApprovedSubnetsService],
})
export class AuthModule {}
