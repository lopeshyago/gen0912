const { Sequelize } = require('sequelize');
require('dotenv').config();

// Permite usar DATABASE_URL (ex.: render, railway, supabase) ou campos separados
const databaseUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;
const useSSL = (process.env.DB_SSL || '').toLowerCase() === 'true' || (databaseUrl || '').includes('supabase.co');

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      define: { timestamps: true, underscored: true, freezeTableName: true },
      dialectOptions: useSSL ? { ssl: { require: true, rejectUnauthorized: false } } : {},
    })
  : new Sequelize(
      process.env.DB_NAME || 'genesix_db',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || 'postgres',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
        define: { timestamps: true, underscored: true, freezeTableName: true },
        dialectOptions: useSSL ? { ssl: { require: true, rejectUnauthorized: false } } : {},
      }
    );

// Testar conexão
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com PostgreSQL estabelecida com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message);
    process.exit(1);
  }
};

// Sincronizar modelos (apenas em desenvolvimento)
const syncDatabase = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await sequelize.sync({ alter: true });
      console.log('🔄 Modelos sincronizados com o banco de dados.');
    } catch (error) {
      console.error('❌ Erro ao sincronizar modelos:', error.message);
    }
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
};
