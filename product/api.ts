import axios from "axios";
import { Product } from "./types";
import Papa from "papaparse";

export default {
    list: async (): Promise<Product[]> =>{
        return axios
        .get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vRC9grQUxgyr2n3yK6dEJn6srjkp0AdCr2wrW_aVD4f4GCDXlQfVLQ_b4VPLcPzWh3Lxn_3Wqxoxs2C/pub?output=csv`,
        {
            responseType:'blob',
        },
        )
        .then((response)=>{
            return new Promise<Product[]>((resolve,reject)=>{
                Papa.parse(response.data, {
                    header:true,
                    complete:(results)=>{
                        const products = results.data as Product[];

                        return resolve(
                            products.map((product)=>({
                               ...product,
                               price: Number(product.price), 
                            })),
                        );
                    },
                    error:(error) => reject(error.message)});
            });
        });
    }
}
   
