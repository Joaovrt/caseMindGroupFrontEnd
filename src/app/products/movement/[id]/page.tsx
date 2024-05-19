import MovementCard from "@/components/MovementCard";
import { getProductById } from "@/libs/fetch/getProductById";
import { ChakraProvider } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Movement(context: any){
    const session = await getServerSession();
    if (!session) {
        redirect("/login");
    }

    const productId = context.params.id;
    const data = await getProductById(productId);

    if (data === 0) {
        redirect("/login");
    }

    return (
        <ChakraProvider>
            <MovementCard product={data}></MovementCard>
        </ChakraProvider>
    );
}