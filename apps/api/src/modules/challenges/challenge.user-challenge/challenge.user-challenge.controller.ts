import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { IsOwner } from '@/common/decorators/is-owner.decorator';
import { IsOwnerGuard } from '@/common/guards/is-owner.guard';
import { CurrentUser } from '@/modules/auth/current-user.decorator';

import { IsNotAbandonedGuard } from '../guards/is-not-abandoned.guard';
import { IsNotDisqualifiedGuard } from '../guards/is-not-disqualified.guard';
import { UserChallengeAccessGuard } from '../guards/user-challenge-access-guard';
import { UserChallengeService } from './challenge.user-challenge.service';

@Controller('challenges/:challengeId/users-challenge')
export class UserChallengeController {
  constructor(private readonly service: UserChallengeService) {}

  @Post()
  @UseGuards(UserChallengeAccessGuard) // Assure que l'utilisateur n'est pas le propriétaire et n'a pas souscrit
  create(
    @CurrentUser() user: { id: string },
    @Param('challengeId') challengeId: string,
  ) {
    return this.service.register(+challengeId, +user.id);
  }

  @Get('admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  findAll(
    @CurrentUser() user: { id: string },
    @Param('challengeId') challengeId: string,
  ) {
    return this.service.findUsers(+challengeId, +user.id);
  }

  @Get(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  findOne(@Param('id') id: string, @Param('challengeId') challengeId: string) {
    return this.service.findUser(+id, +challengeId);
  }

  @Delete(':id/admin')
  @UseGuards(IsOwnerGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  remove(@Param('id') id: string, @Param('challengeId') challengeId: string) {
    return this.service.remove(+id, +challengeId);
  }

  @Patch('abandon')
  @UseGuards(IsNotAbandonedGuard)
  abandon(
    @CurrentUser() user: { id: string },
    @Param('challengeId') challengeId: string,
  ) {
    return this.service.abandon(+user.id, +challengeId);
  }

  @Patch(':id/disqualify/admin')
  @UseGuards(IsOwnerGuard, IsNotDisqualifiedGuard)
  @IsOwner('Challenge', 'ownerId', 'challengeId')
  disqualify(
    @Param('id') id: string,
    @Param('challengeId') challengeId: string,
  ) {
    return this.service.disqualify(+id, +challengeId);
  }
}
