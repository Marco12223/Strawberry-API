import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as pack from '../package.json';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle(pack.name)
      .setDescription(pack.description)
      .setVersion(pack.version)
      .addServer('http://localhost:3000', 'Local environment')
      .addBearerAuth({
        type: 'oauth2',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization token',
        description: 'Enter your JWT token in the format "Bearer {token}"'
      }, 'access_token')
      .addSecurityRequirements("access_token")
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);

}
bootstrap();
