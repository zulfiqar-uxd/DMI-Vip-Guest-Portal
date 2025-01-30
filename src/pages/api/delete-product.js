import { connectToDatabase } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const connection = connectToDatabase();
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    connection.query(
      "DELETE FROM products WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error("Error deleting product:", err.message);
          return res
            .status(500)
            .json({ error: "Failed to delete the product" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Product not found" });
        }

        return res
          .status(200)
          .json({ message: "Product deleted successfully" });
      }
    );

    connection.end((err) => {
      if (err) {
        console.error("Error closing the connection:", err.message);
      }
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({
      error: "Failed to connect to the database",
      message: error.message,
    });
  }
}
