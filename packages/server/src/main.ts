import { NestFactory } from '@nestjs/core';
import path from 'path';

import { RootModule } from './root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.useStaticAssets(path.resolve(__dirname + '/../public'));

  await app.listen(80);
}

bootstrap();
