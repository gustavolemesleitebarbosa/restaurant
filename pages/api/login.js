import cookie from 'cookie';
import NextCors from 'nextjs-cors';

const handler = async(req, res) => {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });

  if (req.method === 'POST') {
    const {
      username,
      password
    } = req.body
  
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      res.setHeader("Set-Cookie", cookie.serialize("token", process.env.TOKEN,{
        path:'/',
        secure: true
      }))
      res.status(200).json("Sucessful")
    } else{
      res.status(400).json("Wrong credentials")
    }
  }

}

export default handler;