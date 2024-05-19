import UserForm from "@/components/UserForm";
import { getUserById } from "@/libs/fetch/getUserById";
import { ChakraProvider } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function EditUser(context: any) {
    const session = await getServerSession();
    if (!session) {
        redirect("/login");
    }

    const userId = context.params.id;
    const data = await getUserById(userId);

    if (data == 0) {
        redirect("/login");
    }

    return (
        <ChakraProvider>
            <UserForm cadastrar={false} user={data}></UserForm>
        </ChakraProvider>
    );
}
