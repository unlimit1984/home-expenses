/*
 * Author: Vladimir Vysokomornyi
 */

import * as process from 'process';
import { Logger } from '@nestjs/common';

export default () => {
  const config = {
    port: parseInt(process.env.PORT, 10) || 3000,
    uiUrl: process.env.UI_URL,
    database: {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    mail: {
      host: process.env.MAIL_SMTP_SERVICE,
      username: process.env.MAIL_USERNAME,
      appPassword: process.env.MAIL_APP_PASSWORD
    },
    auth: {
      at_secret: process.env.AUTH_AT_SECRET,
      rt_secret: process.env.AUTH_RT_SECRET
    },
    myToken: process.env.MY_TOKEN
  };
  Logger.debug('config=' + JSON.stringify(config));
  return config;
};
