import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const DATABASE_TEST = './src/database/database.test.sqlite';

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ? DATABASE_TEST : defaultOptions.database
    })
  );
}