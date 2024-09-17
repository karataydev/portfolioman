import pgPromise from 'pg-promise';

// Check for the required environment variable
if (!process.env.DATABASE_URL) {
  throw new Error('Please define the DATABASE_URL environment variable inside .env.local');
}

const DATABASE_URL: string = process.env.DATABASE_URL;

// pg-promise initialization options
const initOptions = {
  // Initialization options
};

const pgp = pgPromise(initOptions);

// Create the database instance
const db = pgp(DATABASE_URL);

// Helper for linking to external query files
function sql(file: string): pgPromise.QueryFile {
  const fullPath: string = new URL(file, import.meta.url).pathname;
  return new pgp.QueryFile(fullPath, { minify: true });
}

// Export the database object for use in other files
export { db, sql, pgp };