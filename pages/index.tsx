import { GetStaticProps } from "next";
import React from "react";
import { Product } from "../product/types";
import api from "../product/api";
import { Box, Button, Center, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

interface Props{
  products : Product[];
}

function parseCurrency(value: number ):string{
  return value.toLocaleString("es-AR",{
    style:"currency",
    currency:"ARS",
  });
}

const IndexRoute:React.FC<Props>=({products})=>{
  const [cart, setCart] = React.useState<Product[]>([]);
  const [selectedImage, setSelectedImage]=React.useState<string>(null);
  const text = React.useMemo(()=>
    cart.reduce((mensaje, product)=> mensaje.concat(`*${product.title} - ${parseCurrency(product.price)} \n`),``)
    .concat(`Total: ${parseCurrency(cart.reduce((total, product)=> total + product.price, 0))}`)
  ,[cart]);
  

  return(
    <LayoutGroup>
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns={"repeat(auto-fill, minmax(240px, 1fr))"}>
          {products.map((product)=>(
            <Stack key={product.id} borderRadius="lg" padding={2} backgroundColor={'gray.100'}>
              <Image 
              objectFit='cover' 
              maxHeight={200}
              cursor='pointer' 
              as={motion.img}
              layoutId={product.id}
              src={product.image}
              onClick={()=> setSelectedImage(product.image)}
              />
              <Stack >
                <Text>{product.title}</Text>
                <Text>{parseCurrency(product.price)}</Text>
                <Button colorScheme="primary" onClick={()=> setCart((cart) => cart.concat(product))}>
                  Add
                </Button>
              </Stack>
            </Stack>
            
          ))}
        </Grid>
        {Boolean(cart.length) && (
        <Box bottom={0} padding={4} position="sticky">
          <Flex alignItems="center" bottom={0} justifyContent="center">
            <Button
            width="fit-content"
            margin="auto"
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/543794656686?text=${encodeURIComponent(text)}`}
            >Completar pedido ({cart.length} productos)
            </Button>
          </Flex>
        </Box> ) }

      </Stack>

      <AnimatePresence>
        {selectedImage && (
        <Flex 
        key="backdrop" 
        alignItems="center" 
        as={motion.div} 
        backgroundColor="rgba(0,0,0,0.5)"
        justifyContent="center"
        layoutId={selectedImage}
        left={0}
        top={0}
        position='fixed'
        width="100%"
        onClick={()=> setSelectedImage(null)}
        >
            <Image key="image" src={selectedImage} />
          </Flex>
          )}
      </AnimatePresence>

    </LayoutGroup>
  ); 
};

export const getStaticProps : GetStaticProps = async () =>{
  const products = await api.list();
  return{
    revalidate:10,
    props:{
      products,
    }
  }
}

export default IndexRoute;