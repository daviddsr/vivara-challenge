import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProfilesRepositoryInterface } from '../../../profiles/domain/repositories/profiles-repository.interface';

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  constructor(
    @Inject('ProfileRepositoryInterface')
    private readonly profilesRepository: ProfilesRepositoryInterface,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const profileId = req.headers['profile_id'] as string;

    if (!profileId) {
      throw new UnauthorizedException("Header 'profile_id' is required");
    }

    const profile = await this.profilesRepository.findProfileById(profileId);

    if (!profile) {
      throw new UnauthorizedException('Invalid profile_id');
    }

    req['user'] = profile;
    next();
  }
}
