/*
 * COPYRIGHT Motorola Solutions, INC.
 * ALL RIGHTS RESERVED.
 * MOTOROLA SOLUTIONS CONFIDENTIAL RESTRICTED
 */

const AUTH_CHANNEL = 'AUTH';
export enum BCCMessageType {
  'Logout' = 'Logout'
}

export const bcc = new BroadcastChannel(AUTH_CHANNEL);
