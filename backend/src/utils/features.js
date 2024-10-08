import jwt from "jsonwebtoken";

export const generateToken = async (payload) => {
    const token = await jwt.sign(payload,process.env.JWT_SECRET);

    if(!token){
        throw new Error("Something went wrong while generating token");
    }

    return token;
}
