import { Product } from '@/types/product';
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
} from '@chakra-ui/react';

interface ProductCardProps {
    product: Product
}
export default function ProductCard({ product }: ProductCardProps) {
    const imageURL = product.image ? `data:image/png;base64,${Buffer.from(product.image.data).toString('base64')}` : '';
    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={'gray.100'}
                boxShadow={'1xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${imageURL})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={imageURL}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        id: {product.id}
                    </Text>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {product.name}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            R$ {product.value}
                        </Text>
                    </Stack>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontSize={'xl'}>
                            Estoque mínimo: 
                        </Text>
                        <Text fontSize={'xl'}>
                            {product.minimum_value}
                        </Text>
                    </Stack>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontSize={'xl'}>
                            Estoque atual: 
                        </Text>
                        <Text fontSize={'xl'} color={product.quantity <= product.minimum_value ? "red" : product.quantity <= product.minimum_value + 5 ? "orange" : "green"}>
                            {product.quantity}
                        </Text>
                    </Stack>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontSize={'md'}>
                            Descrição: 
                        </Text>
                        <Text fontSize={'md'}>
                            {product.description}
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}
