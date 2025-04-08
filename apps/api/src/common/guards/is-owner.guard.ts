// resource-owner.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PrismaService } from '@/prisma/prisma.service';

import {
  IsOwnerMeta,
  RESOURCE_OWNER_KEY,
} from '../decorators/is-owner.decorator';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const meta =
      this.reflector.get<IsOwnerMeta>(
        RESOURCE_OWNER_KEY,
        context.getHandler(),
      ) ||
      this.reflector.get<IsOwnerMeta>(RESOURCE_OWNER_KEY, context.getClass());

    if (!meta) return true;

    const { model, ownerField, routeParam = 'id' } = meta;
    const request = context.switchToHttp().getRequest();
    const resourceId = +request.params[routeParam];
    const userId = +request.user?.id;

    if (!resourceId || !userId)
      throw new ForbiddenException('Access denied: Invalid identifiers.');

    const resource = await this.prisma[model.toLowerCase()].findUnique({
      where: { id: resourceId },
      select: { [ownerField]: true },
    });

    if (!resource) throw new ForbiddenException(`${model} not found.`);

    if (resource[ownerField] !== userId) {
      throw new ForbiddenException(`You are not the owner of this ${model}.`);
    }

    return true;
  }
}
