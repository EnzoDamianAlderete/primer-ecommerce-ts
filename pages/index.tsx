import { GetStaticProps } from "next";
import React from "react";
import { Product } from "../product/types";
import api from "../product/api";
import { Button, Grid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface Props{
  products : Product[];
}

const IndexRoute:React.FC<Props>=({products})=>{
  const [cart, setCart] = React.useState<Product[]>([]);
  const text = React.useMemo(()=>
    cart.reduce((mensaje, product)=> mensaje.concat(`*${product.title} - ${product.price} \n`),``)
    .concat(`Total: $${cart.reduce((total, product)=> total + product.price, 0)}`)
  ,[cart]);
  

  return(
    <Stack>
      <Grid gridGap={6} templateColumns={"repeat(auto-fill, minmax(240px, 1fr))"}>
        {products.map((product)=>(
          <Stack key={product.id} backgroundColor={'gray.100'}>
            <Text>{product.title}</Text>
            <Text>{product.price}</Text>
            <Button colorScheme="blue" onClick={()=> setCart((cart) => cart.concat(product))}>
              Add
            </Button>
          </Stack>
        ))}
      </Grid>
      {Boolean(cart.length) && <Button
      as={Link}
      colorScheme="whatsapp"
      href={`https://wa.me/543794656686?text=${encodeURIComponent(text)}`}
      >Completar pedido ({cart.length} productos)</Button> }
    </Stack>
  ) 
}

export const getStaticProps : GetStaticProps = async () =>{
  const products = await api.list();
  return{
    props:{
      products,
    }
  }
}

export default IndexRoute;