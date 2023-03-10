import NextCors from 'nextjs-cors';
import Product from "../../../models/Product";
import dbConnect from "../../../util/mongo";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });

  const {method, cookies} = req
  const token = cookies.token

  await dbConnect()
   if(method==='GET'){
    try{
      const allProducts = await Product.find();
      res.status(200).json(allProducts)
    }
    catch(err){
      res.status(500).json(err)
    }

   }
   if(method==='POST'){
    // if(!token){
    //   return res.status(401).json("Not authorized")
    // }
    try{
      const product = await Product.create(req.body)
      res.status(201).json(product)
    }
    catch(err){
      res.status(500).json(err)
      console.log(err)
    }
   }
}