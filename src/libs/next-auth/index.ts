import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "./options";

export const nextAuthHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, nextAuthOptions);

export const getNextAuthSession = () => getServerSession(nextAuthOptions);
