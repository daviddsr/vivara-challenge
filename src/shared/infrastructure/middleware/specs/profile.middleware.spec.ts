import { ProfileMiddleware } from '../profile.middleware';
import { ProfileRepository } from '../../../../profiles/domain/repositories/profile.repository';
import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Profile } from '../../../../profiles/domain/entities/profile';
import { ProfileType } from '../../../../profiles/domain/enums/profile-type.enum';

describe('ProfileMiddleware', () => {
  let middleware: ProfileMiddleware;
  let mockProfileRepository: ProfileRepository;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockProfileRepository = {
      findProfileById: jest.fn(),
    } as unknown as ProfileRepository;

    middleware = new ProfileMiddleware(mockProfileRepository);
    mockRequest = {};
    mockResponse = {};
    mockNext = jest.fn();
  });

  it('should throw UnauthorizedException if there is no profile_id', async () => {
    mockRequest.headers = {};

    await expect(
      middleware.use(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      ),
    ).rejects.toThrow(
      new UnauthorizedException("Header 'profile_id' is required"),
    );
  });

  it('should throw UnauthorizedException if profile_id does not exist', async () => {
    mockRequest.headers = { profile_id: 'invalid-profile-id' };
    (mockProfileRepository.findProfileById as jest.Mock).mockResolvedValue(
      null,
    );

    await expect(
      middleware.use(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      ),
    ).rejects.toThrow(new UnauthorizedException('Invalid profile_id'));
  });

  it('should assign profile to req.user if profile_id is valid', async () => {
    const mockProfile = new Profile(
      'David',
      'Soler',
      'Developer',
      1000,
      ProfileType.CLIENT,
      'valid-id',
    );
    mockRequest.headers = { profile_id: 'valid-id' };
    (mockProfileRepository.findProfileById as jest.Mock).mockResolvedValue(
      mockProfile,
    );

    await middleware.use(
      mockRequest as Request,
      mockResponse as Response,
      mockNext,
    );

    expect(mockRequest.profileId).toEqual(mockProfile.id);
    expect(mockNext).toHaveBeenCalled();
  });
});
