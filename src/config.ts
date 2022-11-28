const DEFAULT_PORT = 3002;

export type Config = {
  PORT: number;
  MONGODB_URI: string;
};

export const config = (): Config => ({
  PORT: Number(process.env.PORT || DEFAULT_PORT),
  MONGODB_URI: process.env.MONGODB_URI,
});
