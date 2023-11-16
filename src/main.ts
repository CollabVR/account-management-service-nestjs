import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const port = 3000;
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.TCP,
		options: {
			host: 'account_management_service',
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
	app.useGlobalFilters(new PrismaClientExceptionFilter());

	await app.listen().then(() => console.log(`Running in port ${port}`));
}
bootstrap();
