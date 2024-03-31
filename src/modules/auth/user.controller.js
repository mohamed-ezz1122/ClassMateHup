import User from "../../../db/model/user.model.js";
import { sendEmailServics } from "../Services/verify-services.module.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//==========add user ==========

/**
 * distract data from body
 * ckeck if email or phone namber doblacate
 * hash password
 * verify email
 * create user object
 * create user
 *
 */
export const logInUser = async (req, res, next) => {
  //distract data from body
  const {
    name,
    email,
    password,
    rePassword,
    phoneNumbers,
    age,
    role,
    academicYear,
  } = req.body;
  //ckeck if email or phone number doblacate
  console.log("✔");
  const isDocumentDublecate = await User.findOne({ email, phoneNumbers });
  if (isDocumentDublecate)
    return next(new Error("email or phone Number is dublicated"), {
      cause: 400,
    });

  //EMAIL ERIFY
  const token = jwt.sign({ email }, process.env.JWT_SECRET_VERFICATION, {
    expiresIn: "60s",
  }); //TOKEN VERIFY

  const isEmailSend = await sendEmailServics({
    to: email,
    subject: "Email Verification",
    message: `<h4>please clich on this link to verfiy your email</h4>
        <a href="http://localhost:5000/user/verify?token=${token}">Verify Email</a>`,
  });
  if (!isEmailSend)
    return next({
      cause: 500,
      msg: "Email is not sent, please try again later",
    });

  //hash password
  const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  const userObject = {
    name,
    email,  
    password: hashPassword,
    rePassword: hashPassword,
    age,
    role,
    phoneNumbers,
    academicYear,
  };

  const newUser = await User.create(userObject);
  res.status(201).json({
    msg: "done",
    data: newUser,
  });
};

//verify email api

export const verifyEmail = async (req, res, next) => {
  //1)send email in query
  const { token } = req.query;
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_VERFICATION);
  //2)check  if user fond by search by email and isEmailVarified

  const user = await User.findOneAndUpdate(
    { email: decodedData.email, isEmailVerified: false },
    { isEmailVerified: true },
    { new: true }
  );
  if (!user) return next(new Error("user not found", { cause: 404 }));
  return res.status(200).json({
    msg: "success verified",
    data:user,
  });
};

//==========user sigin====>

export const sigIn = async (req, res, next) => {
  const { email, phoneNumbers, password } = req.body;
  //ckeck if user found
  const userCheck = await User.findOne({ $or: [{ email }, { phoneNumbers }] });
  if (!userCheck) return next({ msg: "user Not found", cause: 404 });

  //comber password

  const isPasswordValid = bcrypt.compareSync(password, userCheck.password);
  if (!isPasswordValid) return next({ msg: "password false", cause: 400 });

  const token = jwt.sign(
    { id: userCheck._id, email: userCheck.email, role: userCheck.role },
    process.env.SIGIN_SIGNATCHER
  );

  return res.status(200).json({
    msg: "welcom",
    token,
  });
};

export const userInfo = async (req, res, next) => {
  console.log(req.authUser);
};
