import mysql from "mysql";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

export const connectToDatabase = () => {
  try {
    const connection = mysql.createConnection(dbConfig);
    console.log("Database connected");

    connection.on("end", () => {
      console.log("Database connection closed.");
    });

    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    return null;
  }
};
