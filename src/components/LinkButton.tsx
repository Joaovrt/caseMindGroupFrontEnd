import { Link, Button } from "@chakra-ui/react";

interface LinkButtonProps{
    label:string,
    link:string,
    color:string
}

export default function LinkButton({label, link, color}:LinkButtonProps) {
    return (
        <Link
            _hover={{
                textDecoration: 'none'
            }}
            href={`${link}`}>
            <Button colorScheme={`${color}`}>{label}</Button>
        </Link>
    );
}