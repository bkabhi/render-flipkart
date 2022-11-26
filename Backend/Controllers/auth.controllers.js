import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../Models/user.model.js";
import dotenv from "dotenv";
import axios from "axios";
import { google } from "googleapis";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const client_id = process.env.Google_Client_ID;
const client_secret = process.env.Google_Secret_Key;

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET
  );
}

async function getGoogleOAuthTokens(code) {
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3000/google_OAuth"
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return [
    oauth2Client.credentials.access_token,
    oauth2Client.credentials.id_token,
  ];
}

const googleOAuth = async (req, res) => {
  const { code } = req.query;
  const [access_token, id_token] = await getGoogleOAuthTokens(code);
  console.log(access_token);
  console.log();
  console.log(id_token);
  const url = `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`;
  const obj = { headers: { Authorization: `Bearer ${id_token}` } };
  // const url = "https://www.googleapis.com/oauth2/v3/userinfo";
  // const obj = {
  //   headers: { Authorization: `Bearer ${id_token}` },
  //   alt: "json",
  //   access_token,
  // };
  let user = await axios.get(url, obj);

  console.log(user);

  return res.send({
    status: code,
  });
};

const login = async (req, res) => {
  const user = req.body;

  let { email, password } = user;

  let existingUser = await userModel.findOne({
    email,
  });

  if (existingUser) {
    let match = bcrypt.compareSync(password, existingUser.password);

    if (match) {
      let token = generateToken(existingUser);

      return res.status(200).send({
        status: "success",
        name: existingUser.name,
        id: existingUser._id,
        token,
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "Invalid Password",
      });
    }
  } else {
    return res.status(400).send({
      status: "error",
      message: "Invalid Email",
    });
  }
};

const getLoggedInUser = async (req, res) => {
  const { user } = req;

  if (user) {
    return res.status(200).send({
      status: "success",
      data: user,
    });
  } else {
    return res.status(400).send({
      status: "error",
      message: "User is not Logged In",
    });
  }
};

const register = async (req, res) => {
  const user = req.body;

  let { name, email, password } = user;

  let existingUser = await userModel.findOne({
    email,
  });

  if (existingUser) {
    return res.status(400).send({
      status: "error",
      message: "User already exists with the given email",
    });
  } else {
    password = bcrypt.hashSync(password);
    const check = email.split("@");
    const isAdmin = check[1] === "masaischool.com";
    let user = await userModel.create({
      name,
      email,
      password,
      isAdmin,
    });

    user = user.toJSON();

    delete user.password;

    return res.status(200).send({
      status: "success",
      data: user,
    });
  }
};

const checkUserExistance = async (req, res) => {
  const user = req.body;

  let { email } = user;

  let existingUser = await userModel.findOne({
    email,
  });

  if (existingUser) {
    return res.status(200).send({
      status: "Success",
      message: "User Exist",
    });
  } else {
    return res.status(400).send({
      status: "error",
      message: "User does not exist",
    });
  }
};

export { register, login, getLoggedInUser, checkUserExistance, googleOAuth };
