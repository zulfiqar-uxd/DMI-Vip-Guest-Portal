import { connectToDatabase } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const connection = connectToDatabase();

    const {
      id,
      name_en,
      name_ar,
      image_base64,
      is_hidden,
      requires_customizer,
    } = req.body;

    if (!id || !name_en || !name_ar || !image_base64) {
      return res.status(400).json({
        error: "Missing required fields (id, name_en, name_ar, image_base64)",
      });
    }

    connection.query(
      "UPDATE products SET name_en = ?, name_ar = ?, image_base64 = ?, is_hidden = ?, requires_customizer = ?, updated_at = NOW() WHERE id = ?",
      [
        name_en,
        name_ar,
        image_base64,
        is_hidden ? 1 : 0,
        requires_customizer ? 1 : 0,
        id,
      ],
      (err, results) => {
        if (err) {
          console.error("Error updating product:", err.message);
          res.status(500).json({ error: "Failed to update product" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: "Product not found" });
        } else {
          res.status(200).json({ message: "Product updated successfully" });
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
