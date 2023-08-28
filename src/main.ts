import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const port = Number(new ConfigService().get('PORT'));
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: port,
		},
	} as TcpOptions);

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

	await app.listen().then(() => console.log(`Running in port ${port}`));
}
bootstrap();
