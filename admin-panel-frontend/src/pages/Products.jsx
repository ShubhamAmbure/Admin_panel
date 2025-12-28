
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import Modal from "../components/Modal";
// import DeleteConfirmModal from "../components/DeleteConfirmModal";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   const [name, setName] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [subcategoryId, setSubcategoryId] = useState("");
//   const [status, setStatus] = useState("Active");

//   useEffect(() => {
//     document.title = "Products";
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const [p, c, s] = await Promise.all([
//       api.get("/products"),
//       api.get("/categories"),
//       api.get("/subcategories"),
//     ]);
//     setProducts(p.data);
//     setCategories(c.data);
//     setSubcategories(s.data);
//   };

//   useEffect(() => {
//     const filtered = subcategories.filter(
//       sub => sub.categoryId?._id === categoryId
//     );
//     setFilteredSubcategories(filtered);
//     if (!filtered.find(s => s._id === subcategoryId)) {
//       setSubcategoryId("");
//     }
//   }, [categoryId, subcategories]);

//   const confirmDelete = async () => {
//     await api.delete(`/products/${deleteId}`);
//     setDeleteId(null);
//     fetchData();
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between">
//         <h1 className="text-2xl font-semibold">Products</h1>
//         <button onClick={() => setModalOpen(true)} className="bg-purple-700 text-white px-4 py-2 rounded">
//           + Add Product
//         </button>
//       </div>

//       <div className="bg-white shadow rounded">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Subcategory</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <tr key={p._id} className="border-t">
//                 <td className="p-3">{p.name}</td>
//                 <td className="p-3">{p.categoryId?.name}</td>
//                 <td className="p-3">{p.subcategoryId?.name}</td>
//                 <td className="p-3">{p.status}</td>
//                 <td className="p-3 text-right space-x-3">
//                   <button onClick={() => setEditingProduct(p)} className="text-blue-600">Edit</button>
//                   <button onClick={() => setDeleteId(p._id)} className="text-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <DeleteConfirmModal
//         isOpen={!!deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={confirmDelete}
//         title="Delete Product"
//       />
//     </div>
//   );
// };

// export default Products;








import { useState, useEffect } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [status, setStatus] = useState("Active");
  const [imagePreview, setImagePreview] = useState(null);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [prodRes, catRes, subRes] = await Promise.all([
      api.get("/products"),
      api.get("/categories"),
      api.get("/subcategories"),
    ]);
    setProducts(prodRes.data);
    setCategories(catRes.data);
    setSubcategories(subRes.data);
    setLoading(false);
  };

  /* -------- FILTER SUBCATEGORIES -------- */
  useEffect(() => {
    if (!categoryId) {
      setFilteredSubcategories([]);
      setSubcategoryId("");
      return;
    }

    const filtered = subcategories.filter(
      (s) => s.categoryId?._id === categoryId
    );
    setFilteredSubcategories(filtered);
  }, [categoryId, subcategories]);

  /* ---------------- ACTIONS ---------------- */
  const openAdd = () => {
    setEditing(null);
    setName("");
    setCategoryId("");
    setSubcategoryId("");
    setStatus("Active");
    setImagePreview(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setName(product.name);
    setCategoryId(product.categoryId?._id);
    setSubcategoryId(product.subcategoryId?._id);
    setStatus(product.status);
    setImagePreview(product.image || null);
    setModalOpen(true);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      categoryId,
      subcategoryId,
      status,
      image: imagePreview,
    };

    if (editing) {
      await api.put(`/products/${editing._id}`, payload);
    } else {
      await api.post("/products", payload);
    }

    setModalOpen(false);
    fetchData();
  };

  const confirmDelete = async () => {
    await api.delete(`/products/${deleteId}`);
    setDeleteOpen(false);
    fetchData();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Product</h1>
        <button
          onClick={openAdd}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* TABLE */}
      {/* <table className="w-full bg-white rounded shadow">
        <thead className="bg-yellow-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Image</th>
            <th className="p-2">Sub Category</th>
            <th className="p-2">Category</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.name}</td>

              <td className="p-2">
                <img
                  src={p.image || "https://via.placeholder.com/50"}
                  className="w-10 h-10 rounded object-cover"
                />
              </td>

              <td className="p-2">{p.subcategoryId?.name}</td>
              <td className="p-2">{p.categoryId?.name}</td>

              <td
                className={`p-2 ${
                  p.status === "Active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {p.status}
              </td>

              <td className="p-2 space-x-2">
                <button onClick={() => openEdit(p)}>✏️</button>
                <button
                  onClick={() => {
                    setDeleteId(p._id);
                    setDeleteOpen(true);
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="overflow-x-auto">
  <table className="w-full bg-white rounded-lg shadow-md min-w-max">
    <thead className="bg-yellow-100">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Sub Category</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {products.map((p) => (
        <tr key={p._id} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {p.name}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex justify-center">
              <img
                src={p.image || "https://via.placeholder.com/50x50?text=No+Image"}
                alt={p.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
            </div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {p.subcategoryId?.name || 'N/A'}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {p.categoryId?.name || 'N/A'}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm">
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                p.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {p.status}
            </span>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => openEdit(p)}
                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  setDeleteId(p._id);
                  setDeleteOpen(true);
                }}
                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* ADD / EDIT MODAL */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="w-full border p-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-2"
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            disabled={!categoryId}
            required
          >
            <option value="">Select Subcategory</option>
            {filteredSubcategories.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* IMAGE ADD-ON */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
  <div className="relative w-16 h-16 shrink-0">
    <input
      type="file"
      accept="image/*"
      onChange={handleImage}
      className="hidden"
      id="image-input"
    />
    <label
      htmlFor="image-input"
      className="absolute inset-0 w-full h-full rounded-lg cursor-pointer bg-white border-2 border-dashed border-gray-300 hover:border-indigo-400 transition-colors flex items-center justify-center"
    >
      {imagePreview ? (
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <img
            src={imagePreview}
            alt="Uploaded image"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center opacity-0 hover:opacity-100 transition-opacity">
            Tap to replace
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span className="text-xs">Photo</span>
        </div>
      )}
    </label>
  </div>
  <div className="flex-1 min-w-0">
    {imagePreview ? (
      <div>
        <p className="text-sm font-medium text-gray-900 truncate">Image loaded</p>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Reset: setImagePreview(null); handleImage({ target: { files: [] } });
          }}
          className="text-xs text-red-600 hover:text-red-800 underline mt-1"
        >
          Remove
        </button>
      </div>
    ) : (
      <p className="text-sm text-gray-500">No image selected</p>
    )}
  </div>
</div>

          <select
            className="w-full border p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="bg-purple-700 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRM MODAL */}
      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
      />
    </div>
  );
};

export default Products;
