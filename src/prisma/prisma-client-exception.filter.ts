import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
	catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		switch (exception.code) {
			case 'P2002':
				const status = HttpStatus.CONFLICT;
				const message = exception.message.replace(/\n/g, '');
				response.status(status).json({
					statusCode: status,
					message: message,
				});
				break;
			// TODO catch other error codes (e.g. 'P2000' or 'P2025')
			default:
				// default 500 error code
				throw new RpcException(exception.message);
				break;
		}
	}
}
