import { Controller, Get, Query } from '@nestjs/common';
import { AuditLog } from '@prisma/client';

import { Scopes } from '@/modules/auth/scope.decorator';
import { CursorPipe } from '@/pipes/cursor.pipe';
import { OptionalIntPipe } from '@/pipes/optional-int.pipe';
import { OrderByPipe } from '@/pipes/order-by.pipe';
import { WherePipe } from '@/pipes/where.pipe';
import { Expose } from '@/prisma/prisma.interface';

import { AuditLogsService } from './audit-logs.service';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private auditLogsService: AuditLogsService) {}

  /** Get audit logs for a group */
  @Get()
  @Scopes('audit-log-*:read-info')
  async getAll(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('cursor', CursorPipe) cursor?: Record<string, number | string>,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Expose<AuditLog>[]> {
    return this.auditLogsService.getAuditLogs({
      skip,
      take,
      orderBy,
      /*  cursor, */
      where,
    });
  }
}
