// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy } from 'remix-auth-google'
import { User } from "@prisma/client";
import { prisma } from "./prisma";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    const email = profile.emails[0].value;

    return await prisma.user.upsert({
      where: {email},
      update: {},
      create: {
        email, 
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      },
    });
  }
)

authenticator.use(googleStrategy)
