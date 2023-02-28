import Order from '../../../models/Order';
import dbConnect from "../../../util/mongo";

const handler = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
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