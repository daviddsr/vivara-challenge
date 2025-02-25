import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProfileRepository } from '../../../profiles/domain/repositories/profile.repository';

@Injectable()
export class ProfileMiddleware implements NestMiddleware {
  constructor(
    @Inject('ProfileRepository')
    private readonly profileRepository: ProfileRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const profileId = req.headers['profile_id'] as string;

    if (!profileId) {
      throw new UnauthorizedException("Header 'profile_id' is required");
    }

    const profile = await this.profileRepository.findProfileById(profileId);

    if (!profile) {
      throw new UnauthorizedException('Invalid profile_id');
    }

    req.profileId = String(profile.id);
    next();
  }
}
