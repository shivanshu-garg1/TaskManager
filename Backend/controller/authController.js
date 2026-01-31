import users from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

// signup
const signUp = async (req, res) => {
  const { name, email, role, password } = req.body;

  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: "All Fields required" });
  }

  try {
    const exists = await users.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await hashPassword(password);
    const newUser = await users.create({
      name,
      email,
      role,
      password: hash,
    });

    const token = generateToken({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "User Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Fields requires" });
  }

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const compare = await comparePassword(password, user.password);
    if (!compare) {
      return res.status(400).json({ message: "Password Does not match" });
    }

    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Logged in successfully",
        user: {
          id: user._id,
          role: user.role,
        },
      });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(0),
    })
    .json({ message: "Logged out successfully" });
};

// check logged in user
const getMe = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  });
};

export default { signUp, login, logout, getMe };
