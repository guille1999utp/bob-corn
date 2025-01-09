import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
    const roleClient = await prisma.salePopCorn.findMany({
        select:{
            identityCard:true,
            salesCount:true
        }
    });

  
    return NextResponse.json(roleClient, { status: 200 });
}

interface Body {
    identityCard: string;
}

export async function POST(
    req: Request
): Promise<NextResponse> {
    let { identityCard }: Body = await req.json();;
    try {

        if(!identityCard){
            return NextResponse.json({ message: "La identificacion del cliente es obligatoria" }, { status: 400 });
        }

        identityCard = identityCard.toString();

        const existRegisterOfPopCorn = await prisma.salePopCorn.findFirst(
            {
                where: {
                    identityCard
                }
            }
        );
        

        if (existRegisterOfPopCorn) {

            const lastBuyDate = new Date(existRegisterOfPopCorn.lastBuyDate);
            const currentDate = new Date();

            const lastMinute = currentDate.getTime() - lastBuyDate.getTime();
            
            if (lastMinute < 60000) {
                const remainingTime = 60000 - lastMinute; // Tiempo restante en milisegundos

                const remainingSeconds = Math.floor(remainingTime / 1000);

                const seconds = remainingSeconds % 60;

                return NextResponse.json({ message: `No puedes comprar maiz tan seguido, te faltan  ${seconds} segundos para comprar de nuevo` }, { status: 428 });
            }


            const salesCount = existRegisterOfPopCorn.salesCount + 1;

            await prisma.salePopCorn.update({
                where: { id: existRegisterOfPopCorn.id },
                data: {
                    salesCount: salesCount,
                    lastBuyDate: new Date()
                }
            });
            return NextResponse.json({ message: "Success" }, { status: 200 });

        }
        else {
            await prisma.salePopCorn.create({
                data: {
                    salesCount: 1,
                    identityCard,
                    lastBuyDate: new Date()
                }
            });
            
        return NextResponse.json({ message: "Success" }, { status: 200 });
        
    }
        
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { message: "Error al adicionar compra al cliente" },
        { status: 500 }
      );
    }
}
  