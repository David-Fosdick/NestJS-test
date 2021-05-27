import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AddRoleDto } from './dto/addRole.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async addrole(addroleDto: AddRoleDto): Promise<User> {
    return this.userRepository.addRole(addroleDto);
  }
}
