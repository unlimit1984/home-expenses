/*
 * Author: Vladimir Vysokomornyi
 */

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  readonly uiUrl: string;
  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) {
    this.uiUrl = configService.get<string>('uiUrl');
  }

  public sendWelcomeMail(email: string, verificationCode: string): void {
    this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Home Expenses App. Confirm your Email',
      text: 'Activate your account',
      html: `<p>Go to ${this.uiUrl}/auth/signup-finish and finish registration using your credentials and this code: ${verificationCode}</p>`
    });
  }

  public sendRecoverPasswordMail(email: string, verificationCode: string): void {
    this.mailerService.sendMail({
      to: email,
      subject: 'Reset password for Home Expenses App',
      text: 'Create new password',
      html: `<p>Go to ${this.uiUrl}/auth/forgot-password-finish and reset password using this code: ${verificationCode}</p>`
    });
  }
}
