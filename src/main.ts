import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Your API Title')
  .setDescription('Your API description')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer('https://staging.yourapi.com/', 'Staging')
  .addServer('https://production.yourapi.com/', 'Production')
  .addTag('Your API Tag')
  .addBearerAuth(
    { 
      type: 'http', 
      scheme: 'bearer', 
      bearerFormat: 'JWT',
      name: 'JWT',
      description: '인증에 필요한 JWT 토큰을 입력하세요',
      in: 'header'
    },
    'access-token',
  )
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const serverConfig = config.get('server')
  const port = serverConfig.port;
  
  await app.listen(port);
  Logger.log(`Application running on port ${port} `)
}
bootstrap();
