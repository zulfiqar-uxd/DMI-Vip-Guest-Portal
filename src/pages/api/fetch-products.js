import { connectToDatabase } from "@/utils/db";

export default function handler(req, res) {
  try {
    const connection = connectToDatabase();

    connection.query("SELECT * FROM products", (err, results) => {
      if (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).json({
          message: "Error fetching products",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Database connection successful!",
          products: results,
        });
      }

      // Close connection after query
      connection.end((err) => {
        if (err) {
          console.error("Error closing the connection:", err.message);
        }
      });
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    // Send an error response
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
}
