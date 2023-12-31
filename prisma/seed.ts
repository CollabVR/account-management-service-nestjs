import { PrismaClient } from '@prisma/client';
import { roles } from './roles';

const prisma = new PrismaClient();

async function main() {
	for (const role of roles) {
		const existingRole = await prisma.role.findFirst({
			where: { name: role.name },
		});

		if (!existingRole) {
			await prisma.role.create({
				data: role,
			});
		}
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});