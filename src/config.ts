const DEFAULT_PORT = 3002;

export type Config = {
  PORT: number;
  MONGODB_URI: string;
  AUTH0_ISSUER_URL: string;
  AUTH0_AUDIENCE: string;
};

export const config = (): Config => ({
  PORT: Number(process.env.PORT || DEFAULT_PORT),
  MONGODB_URI: process.env.MONGODB_URI,
  AUTH0_ISSUER_URL: process.env.AUTH0_ISSUER_URL,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
});
