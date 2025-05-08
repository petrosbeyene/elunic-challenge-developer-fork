import { DataSource } from 'typeorm';
import { createConnection } from 'mysql2/promise';
import { databaseConfig } from '../config/database.config';
import { UserMessage } from '../entities/user-message.entity';
import { CreateUserMessages1710876000000 } from '../migrations/1710876000000-CreateUserMessages';

async function createDatabase() {
  const { host, port, username: user, password, database } = databaseConfig as any;
  const connection = await createConnection({
    host,
    port,
    user,
    password,
  });

  try {
    // Drop the database if it exists
    await connection.query(`DROP DATABASE IF EXISTS ${database}`);
    console.log('Database dropped if existed');
    
    // Create the database
    await connection.query(`CREATE DATABASE ${database}`);
    console.log('Database created');
  } catch (error) {
    console.error('Error managing database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

const dataSource = new DataSource({
  ...databaseConfig,
  type: 'mysql',
  entities: [UserMessage],
  migrations: [CreateUserMessages1710876000000],
} as any);

async function run() {
  try {
    await createDatabase();
    await dataSource.initialize();
    console.log('Running migrations...');
    await dataSource.runMigrations();
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

run(); 