export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    nameDB: process.env.POSTGRES_DB || 'kupipodariday',
    password: process.env.POSTGRES_PASSWORD || 'student',
    name: process.env.POSTGRES_username || 'student',
  },
  jwt: {
    secret: process.env.SECRET || 'JWT_SECRET',
    ttl: process.env.JWT_TTL || '30000s',
  },
});
