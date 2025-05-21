const {Schema} = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersSchema = new Schema({
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });
  
  UsersSchema.pre("save", async function (next) {

    const user = this;

    if (!user.isModified("password") || !user.password) {
       next();
    }
  
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
      next();
    } catch (err) {
      next(err);
    }
  });

  UsersSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
  }

  UsersSchema.methods.generateToken =async function () {
    try {
      return jwt.sign({
        userId: this._id.toString(),
        email: this.email
      },
     process.env.TOKEN_KEY,
     {
      expiresIn: "30d"
     }
    )
    } catch (error) {
      console.log(error);
    }
  }
  
  
  module.exports = {UsersSchema}