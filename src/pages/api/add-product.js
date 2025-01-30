import { connectToDatabase } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const connection = connectToDatabase();

    const { name_en, name_ar, image_base64, is_hidden, requires_customizer } =
      req.body;

    if (!name_en || !name_ar || !image_base64) {
      return res.status(400).json({
        error: "Missing required fields (name_en, name_ar, image_base64)",
      });
    }

    connection.query(
      "INSERT INTO products (name_en, name_ar, image_base64, is_hidden, requires_customizer, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [
        name_en,
        name_ar,
        image_base64,
        is_hidden ? 1 : 0,
        requires_customizer ? 1 : 0,
      ],
      (err, results) => {
        if (err) {
          console.error("Error inserting product:", err.message);
          res.status(500).json({ error: "Failed to add product" });
        } else {
          res.status(201).json({
            message: "Product added successfully",
            productId: results.insertId,
          });
        }

        // Close connection after query
        connection.end((err) => {
          if (err) {
            console.error("Error closing the connection:", err.message);
          }
        });
      }
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({ error: "Database connection failed" });
  }
}
