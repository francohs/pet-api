import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OwnersService } from '../owners/owners.service';
import { OwnerDocument } from '../owners/owners.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private ownersService: OwnersService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const owner = (await this.ownersService.create(
      name,
      email,
      password,
    )) as OwnerDocument;
    return this.signToken(owner._id.toString(), owner.email);
  }

  async login(email: string, password: string) {
    const owner = await this.ownersService.findByEmail(email);
    if (!owner) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, owner.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(owner._id.toString(), owner.email);
  }

  private signToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
