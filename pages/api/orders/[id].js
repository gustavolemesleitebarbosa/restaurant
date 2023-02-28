import Order from '../../../models/Order';
import dbConnect from "../../../util/mongo";


const handler = async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  const {
    method,
    query: {id},
  } = req
  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id)
      res.status(200).json(order)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body,{new: true});
      res.status(200).json(order)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if (method === "DELETE") {

  }

}

export default handler