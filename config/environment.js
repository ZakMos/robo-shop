const { env } = process;

const config = {
  env: env.NODE_ENV || 'development'
};

const devConfig = {
  db: 'mongodb://localhost:27017/robo-shop'
};

const prodConfig = {
  db: env.MONGO_URL
};

const currentConfig = config.env === 'production' ? prodConfig : devConfig;

module.exports = Object.assign({}, config, currentConfig);
