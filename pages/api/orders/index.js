import NextCors from 'nextjs-cors';
import Order from '../../../models/Order';
import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  const {method} = req
  await dbConnect()
   if(method==='GET'){
    try{
      const allProducts = await Order.find();
      res.status(200).json(allProducts)
    }
    catch(err){
      res.status(500).json(err)
    }

   }

  if (method === "POST") {
    try{
      const order = await Order.create(req.body)
      res.status(201).json(order)
    }
    catch(err){
      res.status(500).json(err)
      console.log(err)
    }
  }
}

export default handler