/*
 * Author: Vladimir Vysokomornyi
 */

import { Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { User } from './user.entity';
import { CredentialsDto } from './credentials';
import { CreateUserDto } from './create.user.dto';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserDbService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUser(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = dto.email;
    user.preview = dto.preview;
    user.passwordHash = dto.passwordHash;

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async delete(email: string): Promise<any> {
    return this.userRepository.delete({ email });
  }

  async createPreview(credentials: CredentialsDto): Promise<User> {
    const newUser: Partial<User> = {
      email: credentials.email,
      passwordHash: await argon.hash(credentials.password),
      preview: true,
      verificationCodeHash: await argon.hash(credentials.verificationCode)
    };

    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async activate(user: User): Promise<User> {
    user.preview = false;
    user.verificationCodeHash = null;
    return this.userRepository.save(user);
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    if (refreshToken) {
      user.refreshTokenHash = await argon.hash(refreshToken);
    } else {
      user.refreshTokenHash = null;
    }

    return this.userRepository.save(user);
  }

  async updatePassword(user: User, newPassword: string, refreshToken: string) {
    user.refreshTokenHash = await argon.hash(refreshToken);
    user.passwordHash = await argon.hash(newPassword);
    return this.userRepository.save(user);
  }

  async pendingRecover(user: User, verificationCode: string): Promise<User> {
    user.pendingRecover = true;
    user.verificationCodeHash = await argon.hash(verificationCode);
    return this.userRepository.save(user);
  }

  async finishRecover(user: User, newPassword: string): Promise<User> {
    user.passwordHash = await argon.hash(newPassword);
    user.pendingRecover = false;
    user.verificationCodeHash = null;
    return this.userRepository.save(user);
  }
}
