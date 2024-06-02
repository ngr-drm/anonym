import env from 'env-var';

const vars = {
  DB_HOST: env.get('PG_HOST').required().asString(),
  DB_USER: env.get('PG_USER').required().asString(),
  DB_PASSWORD: env.get('PG_PASSWORD').required().asString(),
  DB_DATABASE: env.get('PG_DATABASE').required().asString(),
  DB_PORT: env.get('PG_PORT').required().asPortNumber(),
  API_PORT: env.get('API_PORT').required().asPortNumber(),
};

export default vars;
