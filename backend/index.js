require("dotenv").config();
const jwt = require("jsonwebtoken");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); 
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const {UsersModel} = require("./models/UsersModel");



const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(bodyParser.json());


// const allowedOrigins = [
//   "http://localhost:3000",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//   if (!origin || allowedOrigins.includes(origin) || origin.endsWith("vercel.app")) {
//     callback(null, true);
//   } else {
//     callback(new Error("Not allowed by CORS"));
//   }
// },
//     credentials: true,
//   })
// );
const cors = require('cors')
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

app.use(cookieParser());
app.use(express.json());

// app.get("/addHoldings",async(req,res)=>{
//     let tempHoldings = [
//         {
//           name: "BHARTIARTL",
//           qty: 2,
//           avg: 538.05,
//           price: 541.15,
//           net: "+0.58%",
//           day: "+2.99%",
//         },
//         {
//           name: "HDFCBANK",
//           qty: 2,
//           avg: 1383.4,
//           price: 1522.35,
//           net: "+10.04%",
//           day: "+0.11%",
//         },
//         {
//           name: "HINDUNILVR",
//           qty: 1,
//           avg: 2335.85,
//           price: 2417.4,
//           net: "+3.49%",
//           day: "+0.21%",
//         },
//         {
//           name: "INFY",
//           qty: 1,
//           avg: 1350.5,
//           price: 1555.45,
//           net: "+15.18%",
//           day: "-1.60%",
//           isLoss: true,
//         },
//         {
//           name: "ITC",
//           qty: 5,
//           avg: 202.0,
//           price: 207.9,
//           net: "+2.92%",
//           day: "+0.80%",
//         },
//         {
//           name: "KPITTECH",
//           qty: 5,
//           avg: 250.3,
//           price: 266.45,
//           net: "+6.45%",
//           day: "+3.54%",
//         },
//         {
//           name: "M&M",
//           qty: 2,
//           avg: 809.9,
//           price: 779.8,
//           net: "-3.72%",
//           day: "-0.01%",
//           isLoss: true,
//         },
//         {
//           name: "RELIANCE",
//           qty: 1,
//           avg: 2193.7,
//           price: 2112.4,
//           net: "-3.71%",
//           day: "+1.44%",
//         },
//         {
//           name: "SBIN",
//           qty: 4,
//           avg: 324.35,
//           price: 430.2,
//           net: "+32.63%",
//           day: "-0.34%",
//           isLoss: true,
//         },
//         {
//           name: "SGBMAY29",
//           qty: 2,
//           avg: 4727.0,
//           price: 4719.0,
//           net: "-0.17%",
//           day: "+0.15%",
//         },
//         {
//           name: "TATAPOWER",
//           qty: 5,
//           avg: 104.2,
//           price: 124.15,
//           net: "+19.15%",
//           day: "-0.24%",
//           isLoss: true,
//         },
//         {
//           name: "TCS",
//           qty: 1,
//           avg: 3041.7,
//           price: 3194.8,
//           net: "+5.03%",
//           day: "-0.25%",
//           isLoss: true,
//         },
//         {
//           name: "WIPRO",
//           qty: 4,
//           avg: 489.3,
//           price: 577.75,
//           net: "+18.08%",
//           day: "+0.32%",
//         },
//       ];

//       tempHoldings.forEach(item => {
//         let newHolding = new HoldingsModel({
//             name:item.name,
//             qty:item.qty,
//             avg:item.avg,
//             price:item.price,
//             net: item.day,
//             day: item.day,
//         });

//         newHolding.save();
//       });
//       res.send("Done!");
// })


// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPositions = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPositions.save();
//   });
//   res.send("Done!");
// });

app.post('/signup',async (req,res,next) =>{
  try {
    const { email, password, username, createdAt } = req.body;
    
    const existingUser = await UsersModel.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const userCreated = await UsersModel.create({ email, password, username, createdAt });
    
    res
    .status(201)
    .json({
      status: true, 
      message: "User signed in successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString()
    });
    next();
  } catch (error) {
    console.error(error);
  }
});

app.post("/login",async (req,res,next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const userExist = await UsersModel.findOne({ email });

    if(!userExist){
      return res.json({message:'Invalid credentials' }) 
    }

    const user = await userExist.comparePassword(password);

    if (user) {
  res
    .status(201)
    .json({
      status: true, // ✅ add this line
      message: "User logged in successfully",
      token: await userExist.generateToken(),
      userId: userExist._id.toString()
    });
} else {
  res.status(401).json({ status: false, message: "Invalid email or password" });
}
     
  } catch (error) {
    console.error(error);
  }
});

app.post("/",(req,res)=>{
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await UsersModel.findById(data._id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
})


app.get('/allHoldings',async(req,res) =>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

app.get('/allPositions',async(req,res) =>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

app.post("/newOrder" ,async(req,res)=>{
    let newOrder = new OrdersModel({
        name:req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    });

    newOrder.save();

    res.send("Order saved!");
  }
);

app.get("/allOrders", async (req, res) => {
    try {
      const allOrders = await OrdersModel.find({});
      res.json(allOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});
  
app.delete("/orders/:id", async (req, res) => {
    try {
      await OrdersModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: "Failed to delete order" });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  mongoose.connect(uri);
  console.log("DB connected");
});
