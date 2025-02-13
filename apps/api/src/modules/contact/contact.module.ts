import { Module } from '@nestjs/common';

import { PrismaModule } from '@/prisma/prisma.module';
import { MailModule } from '@/providers/mail/mail.module';
import { S3Module } from '@/providers/s3/s3.module';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [PrismaModule, MailModule, S3Module],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
