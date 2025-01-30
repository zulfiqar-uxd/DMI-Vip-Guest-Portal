import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";

const Inventory = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    image_base64: "",
    name_en: "",
    name_ar: "",
    is_hidden: false,
    requires_customizer: false,
  });

  // Fetch Products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetch-products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Image Upload and Convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm((prev) => ({ ...prev, image_base64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productForm.name_en ||
      !productForm.name_ar ||
      !productForm.image_base64
    ) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const endpoint = editingProduct
        ? "/api/update-product"
        : "/api/add-product";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingProduct?.id, ...productForm }),
      });

      if (response.ok) {
        await fetchProducts();
        resetForm();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open Form for Editing
  const handleEdit = (product) => {
    setProductForm({
      image_base64: product.image_base64,
      name_en: product.name_en,
      name_ar: product.name_ar,
      is_hidden: !!product.is_hidden,
      requires_customizer: !!product.requires_customizer,
    });
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.name_en}"?`)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/delete-product`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id }),
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        await fetchProducts();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset Form
  const resetForm = () => {
    setProductForm({
      image_base64: "",
      name_en: "",
      name_ar: "",
      is_hidden: false,
      requires_customizer: false,
    });
    setIsFormVisible(false);
    setEditingProduct(null);
  };

  return (
    <>
      <Head>
        <title>VIP Admin - Inventory</title>
      </Head>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="w-16 h-16 animate-spin"
          >
            <radialGradient
              id="a12"
              cx=".66"
              fx=".66"
              cy=".3125"
              fy=".3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stopColor="#FF0000"></stop>
              <stop offset=".3" stopColor="#FF0000" stopOpacity=".9"></stop>
              <stop offset=".6" stopColor="#FF0000" stopOpacity=".6"></stop>
              <stop offset=".8" stopColor="#FF0000" stopOpacity=".3"></stop>
              <stop offset="1" stopColor="#FF0000" stopOpacity="0"></stop>
            </radialGradient>
            <circle
              transform-origin="center"
              fill="none"
              stroke="url(#a12)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray="200 1000"
              strokeDashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle
              transform-origin="center"
              fill="none"
              opacity=".2"
              stroke="#FF0000"
              strokeWidth="15"
              strokeLinecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        </div>
      )}

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar activePage="/admin/inventory" />

        {/* Main Content */}
        <div className="flex-1 p-6 ml-64">
          <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

          {/* Add Product Button */}
          {!isFormVisible && (
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
              + Add New Product
            </button>
          )}

          {/* Product Form */}
          {isFormVisible && (
            <form
              className="bg-white p-6 shadow rounded grid gap-4 mb-6"
              onSubmit={handleSubmit}
            >
              <label className="text-gray-600 text-sm">
                Upload a high-quality image (1000x1000px recommended)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border p-2 rounded"
                required={!editingProduct}
              />
              {productForm.image_base64 && (
                <img
                  src={productForm.image_base64}
                  alt="Product Preview"
                  className="w-32 h-32 object-cover mt-2 rounded"
                />
              )}

              <input
                type="text"
                name="name_en"
                placeholder="Product Name (English)"
                value={productForm.name_en}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="name_ar"
                placeholder="اسم المنتج"
                value={productForm.name_ar}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_hidden"
                    checked={productForm.is_hidden}
                    onChange={handleChange}
                  />{" "}
                  Hide Product
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="requires_customizer"
                    checked={productForm.requires_customizer}
                    onChange={handleChange}
                  />{" "}
                  Requires Customizer
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Product List */}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Products</h2>

            {products.length === 0 ? (
              <p className="text-gray-500 mt-2">No products available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-white shadow rounded flex flex-col justify-between items-center"
                  >
                    <img
                      src={product.image_base64}
                      alt={product.name_en}
                      className="w-32 h-w-32 object-cover rounded"
                    />
                    <div className="my-4">
                      <p className="font-medium w-full">
                        {product.name_en} / {product.name_ar}
                      </p>
                      {/* Visibility Chip */}
                      <span
                        className={`px-3 py-1 text-xs mr-2 font-medium rounded-full ${
                          product.is_hidden
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.is_hidden ? "Hidden" : "Visible"}
                      </span>

                      {/* Customization Chip */}
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          product.requires_customizer
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.requires_customizer
                          ? "Requires Customizer"
                          : "No Customization"}
                      </span>
                    </div>
                    <div className="flex w-full">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-4 w-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="bg-red-500 text-white px-3 py-1 rounded w-full"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
