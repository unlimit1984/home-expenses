/*
 * Author: Vladimir Vysokomornyi
 */

import { inject, Injectable } from '@angular/core';
import { BCCMessageType, CHANNEL_NAME } from '../../broadcast-channel/broadcast-channel';
import { Router } from '@angular/router';
import { TokenAuthService } from '../token-vault/token-auth.service';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  private broadcastChannel: BroadcastChannel;

  private router = inject(Router);
  private tokenAuthService = inject(TokenAuthService);

  constructor() {
    this.broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
    this.broadcastChannel.onmessage = this.handleMessage.bind(this);
  }

  private handleMessage(event: MessageEvent<BCCMessageType>) {
    console.log('Received message:', event.data);
    switch (event.data) {
      case BCCMessageType.Logout:
        this.tokenAuthService.clearAllTokens();
        this.router.navigate(['/auth/signin']);
        break;
      default:
        console.warn('Unknown broadcast event:,', event.data);
        break;
    }
  }

  sendMessage(message: any) {
    this.broadcastChannel.postMessage(message);
  }
}
