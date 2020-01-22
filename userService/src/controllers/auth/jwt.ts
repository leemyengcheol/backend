import jwt from "jsonwebtoken";
import { client } from "@/controllers/redis";
import { IProfile } from "@/models/google.profile";

const EXPIRE_TIME = 20 * 60;

interface ITokenBody {
  id: string;
  provider: string;
  displayName: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

export const generateToken = async (profile: IProfile): Promise<string> => {
  const { id, displayName, provider } = profile;
  const token = jwt.sign({ id, provider, displayName }, process.env.JWTSECRET, {
    expiresIn: `${EXPIRE_TIME}s`,
    issuer: "retriever.com",
    subject: "userInfo"
  });

  const tokenBody: ITokenBody = jwt.verify(
    token,
    process.env.JWTSECRET
  ) as ITokenBody;
  if (typeof tokenBody !== "string" && tokenBody) {
    await client.set(
      `retrieverjwt:${id}`,
      tokenBody.iat.toString(),
      "EX",
      EXPIRE_TIME
    );
  }

  return token;
};

export const isValidToken = async (user): Promise<Boolean> => {
  const token = await client.get(`retrieverjwt:${user.id}`);
  return +token === user.iat;
};
