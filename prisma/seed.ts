import { PrismaClient } from '@prisma/client';
import { roles } from './roles';

const prisma = new PrismaClient();

async function main() {
	//TODO: Create a manager role and add a single user with that role so it can login and create admin accounts
	for (const role of roles) {
		await prisma.role.create({
			data: role,
		});
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
