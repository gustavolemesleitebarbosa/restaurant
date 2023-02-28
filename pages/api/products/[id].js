import Product from "../../../models/Product";
import dbConnect from "../../../util/mongo";

export default async function handler(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  const {method,
     query: {id},
     cookies
  } = req
  

  await dbConnect()
   if(method==='GET'){
    try{
      const allProducts = await Product.findById(id);
      res.status(200).json(allProducts)
    }
    catch(err){
      res.status(500).json(err)
    }

   }

    if (method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}