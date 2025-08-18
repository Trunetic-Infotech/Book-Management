import jwt from "jsonwebtoken";


export const requiredSignin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // console.log(token);
    

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userID = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
