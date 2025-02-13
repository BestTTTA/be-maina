import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateGoogleUser(profile: any) {
    const { id, emails, displayName, photos } = profile;
    
    const user = await this.prisma.user.upsert({
      where: { googleId: id },
      update: {},
      create: {
        email: emails[0].value,
        name: displayName,
        googleId: id,
        avatar: photos[0]?.value,
      },
    });

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Add password validation logic if implementing local auth
    return user;
  }
}