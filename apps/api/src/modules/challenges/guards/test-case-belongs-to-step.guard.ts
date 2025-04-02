import { PrismaService } from '@/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class TestCaseBelongsToStepGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, stepId } = request.params;

    if (!id || !stepId) {
      throw new NotFoundException('TestCase ID ou Step ID manquant.');
    }

    const testCase = await this.prisma.testCaseChallenge.findUnique({
      where: { id: Number(id) },
    });

    if (!testCase || testCase.stepId !== Number(stepId)) {
      throw new NotFoundException(
        "Ce TestCase n'appartient pas à l'étape spécifiée.",
      );
    }

    return true; // Autorise la requête
  }
}
