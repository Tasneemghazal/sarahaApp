import userModel from "../../../db/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SendEmail from "../../services/SendEmail.js";

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.status(409).json({ error: "user already exists" });
  }
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUND)
  );
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  if (!user) {
    return res.status(400).json({ error: "user doesn't created successfully" });
  }
  const token = await jwt.sign({email},process.env.CONFTOKEN)
  const html = `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1> Hello ${userName}</h1>
  <p>Please confirm your email</p>
<a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">Confirm Email</a>
</div>
  `;
  await SendEmail(email, "WELCOME", html);
  return res.status(201).json({ message: "user created successfully", user });
};
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const existUser = await userModel
    .findOne({ email })
    .select("userName password confirmEmail");
  if (!existUser) {
    return res.status(400).json({ error: "user does not  exist" });
  }
  const match = await bcrypt.compare(password, existUser.password);
  if (!match) {
    return res.status(400).json({ message: "invalid password" });
  }
  const token = await jwt.sign({ id: existUser._id }, process.env.SIGNIN_SIG);
  return res.status(200).json({ message: "success", token });
};
export const confirmEmail = async (req,res) => {
  const {token} = req.params;
  const decoded = await jwt.verify(token, process.env.CONFTOKEN);
  const user = await userModel.findOneAndUpdate({ email: decoded.email},{confirmEmail:true},{new:true});
  
  return res.status(200).json({ message:"success", user });

}
