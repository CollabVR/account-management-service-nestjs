import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// binds ValidationPipe to the entire application
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	// apply transform to all responses
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	// apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
	const { httpAdapter } = app.get(HttpAdapterHost);
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Account Management Service')
		.setDescription('API Description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('api', app, document);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('PORT');
	await app.listen(port, () => console.log(`Running in port ${port}`));
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
