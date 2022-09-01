import { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    console.log('111');
    switch (req.method) {
        case 'POST':
            const prisma = new PrismaClient();
            const user = await prisma.user.findUnique({
              where: { email: req.body.email }
            });

            res.status(200).json(user);
            await prisma.$disconnect()

          break;
        default:
          res.status(405).json({ error: 'Method not allowed' })
      }
}