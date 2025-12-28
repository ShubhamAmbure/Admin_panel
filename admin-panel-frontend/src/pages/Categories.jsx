
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import Modal from "../components/Modal";
// import DeleteConfirmModal from "../components/DeleteConfirmModal";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);

//   const [deleteId, setDeleteId] = useState(null);

//   const [formData, setFormData] = useState({ name: "", status: "Active" });

//   useEffect(() => {
//     document.title = "Categories";
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/categories");
//       setCategories(res.data);
//     } catch {
//       setError("Failed to fetch categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAddModal = () => {
//     setEditingCategory(null);
//     setFormData({ name: "", status: "Active" });
//     setError("");
//     setModalOpen(true);
//   };

//   const handleEdit = (cat) => {
//     setEditingCategory(cat);
//     setFormData({ name: cat.name, status: cat.status });
//     setModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingCategory) {
//         await api.put(`/categories/${editingCategory._id}`, formData);
//       } else {
//         await api.post("/categories", formData);
//       }
//       fetchCategories();
//       setModalOpen(false);
//     } catch {
//       setError("Operation failed");
//     }
//   };

//   const confirmDelete = async () => {
//     await api.delete(`/categories/${deleteId}`);
//     setDeleteId(null);
//     fetchCategories();
//   };

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (error && !modalOpen) return <p className="p-4 text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold">Categories</h1>
//         <button onClick={openAddModal} className="bg-purple-700 text-white px-4 py-2 rounded">
//           + Add Category
//         </button>
//       </div>

//       <div className="bg-white rounded shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((c) => (
//               <tr key={c._id} className="border-t">
//                 <td className="p-3">{c.name}</td>
//                 <td className="p-3">{c.status}</td>
//                 <td className="p-3 text-right space-x-3">
//                   <button onClick={() => handleEdit(c)} className="text-blue-600">Edit</button>
//                   <button onClick={() => setDeleteId(c._id)} className="text-red-600">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//         <h2 className="text-lg font-semibold mb-4">
//           {editingCategory ? "Edit Category" : "Add Category"}
//         </h2>

//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             className="w-full border p-2 rounded"
//             placeholder="Category name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//           />

//           <select
//             className="w-full border p-2 rounded"
//             value={formData.status}
//             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//           >
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>

//           <div className="flex justify-end gap-3">
//             <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
//             <button className="bg-purple-700 text-white px-4 py-2 rounded">
//               {editingCategory ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       <DeleteConfirmModal
//         isOpen={!!deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={confirmDelete}
//         title="Delete Category"
//       />
//     </div>
//   );
// };

// export default Categories;


// import { useState, useEffect } from "react";
// import api from "../services/api";
// import Modal from "../components/Modal";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     status: "Active",
//   });

//   // 🔹 Fetch categories
//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/categories");
//       setCategories(res.data);
//     } catch {
//       setError("Failed to fetch categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     document.title = "Categories";
//     fetchCategories();
//   }, []);

//   // 🔹 Add / Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingCategory) {
//         await api.put(
//           `/categories/${editingCategory._id}`,
//           formData
//         );
//       } else {
//         await api.post("/categories", formData);
//       }

//       await fetchCategories();
//       setModalOpen(false);
//       setEditingCategory(null);
//       setFormData({ name: "", status: "Active" });
//     } catch (err) {
//       setError(err.formData?.message || "Operation failed");
//     }
//   };

//   // 🔹 Edit
//   const handleEdit = (category) => {
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       status: category.status,
//     });
//     setModalOpen(true);
//   };

//   // 🔹 Delete
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?")) return;
//     await api.delete(`/categories/${id}`);
//     fetchCategories();
//   };

//   // 🔹 Add modal
//   const openAddModal = () => {
//     setEditingCategory(null);
//     setFormData({ name: "", status: "Active" });
//     setModalOpen(true);
//   };

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error && !modalOpen)
//     return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">

//       {/* 🔹 Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-4">
//           <h1 className="text-xl font-semibold">Category</h1>

//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search"
//               className="pl-9 pr-3 py-2 border rounded w-64 text-sm focus:outline-none"
//             />
//             <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//           </div>
//         </div>

//         <button
//           onClick={openAddModal}
//           className="bg-purple-700 text-white px-5 py-2 rounded-md text-sm hover:bg-purple-800"
//         >
//           Add New
//         </button>
//       </div>

//       {/* 🔹 Table */}
//       <div className="bg-white rounded-md shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-yellow-100 text-sm">
//             <tr>
//               <th className="p-3 text-left">Id</th>
//               <th className="p-3 text-left">Category name</th>
//               <th className="p-3 text-center">Image</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {categories.map((cat, index) => (
//               <tr
//                 key={cat._id}
//                 className="bg-gray-50 hover:bg-gray-100 border-b text-sm"
//               >
//                 <td className="p-3">{index + 1}</td>

//                 <td className="p-3">{cat.name}</td>

//                 {/* Image (frontend placeholder for now) */}
//                 <td className="p-3 text-center">
//                   <img
//                     src={
//                       cat.image ||
//                       "https://via.placeholder.com/40x40?text=Img"
//                     }
//                     alt="category"
//                     className="w-10 h-10 rounded object-cover mx-auto"
//                   />
//                 </td>

//                 <td className="p-3">
//                   <span
//                     className={
//                       cat.status === "Active"
//                         ? "text-green-600 font-medium"
//                         : "text-red-500 font-medium"
//                     }
//                   >
//                     {cat.status}
//                   </span>
//                 </td>

//                 <td className="p-3 text-center">
//                   <div className="flex justify-center gap-3 text-gray-600">
//                     <button onClick={() => handleEdit(cat)}>✏️</button>
//                     <button onClick={() => handleDelete(cat._id)}>🗑️</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔹 Modal */}
//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//         <h2 className="text-xl font-semibold mb-4">
//           {editingCategory ? "Edit Category" : "Add Category"}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm mb-1">Category Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm mb-1">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData({ ...formData, status: e.target.value })
//               }
//               className="w-full border p-2 rounded"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => setModalOpen(false)}
//               className="px-4 py-2 border rounded"
//             >
//               Cancel
//             </button>
//             <button className="bg-purple-700 text-white px-4 py-2 rounded">
//               {editingCategory ? "Update" : "Save"}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default Categories;


import { useState, useEffect } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
    image: "", // 👈 image preview URL
  });

  // delete modal
  const [deleteId, setDeleteId] = useState(null);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Categories";
    fetchCategories();
  }, []);

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, image: previewUrl });
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, formData);
      } else {
        await api.post("/categories", formData);
      }

      await fetchCategories();
      closeModal();
    } catch {
      setError("Operation failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      status: cat.status,
      image: cat.image || "",
    });
    setModalOpen(true);
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    await api.delete(`/categories/${deleteId}`);
    setDeleteId(null);
    fetchCategories();
  };

  /* ================= HELPERS ================= */
  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", status: "Active", image: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", status: "Active", image: "" });
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error && !modalOpen)
    return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Category</h1>
        <button
          onClick={openAddModal}
          className="bg-purple-700 text-white px-5 py-2 rounded-md"
        >
          Add New
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow">
        {/* <table className="w-full">
          <thead className="bg-yellow-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-center">Image</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, i) => (
              <tr key={cat._id} className="border-b bg-gray-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{cat.name}</td>

                <td className="p-3 text-center">
                  <img
                    src={
                      cat.image ||
                      "https://via.placeholder.com/40?text=Img"
                    }
                    className="w-10 h-10 rounded object-cover mx-auto"
                    alt=""
                  />
                </td>

                <td className="p-3">
                  <span
                    className={
                      cat.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {cat.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="mr-3"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setDeleteId(cat._id)}
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
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {categories.map((cat, i) => (
        <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
            {i + 1}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {cat.name}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex justify-center">
              <img
                src={cat.image || "https://via.placeholder.com/50x50?text=No+Image"}
                alt={cat.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
            </div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm">
            <div className="flex justify-center">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  cat.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {cat.status}
              </span>
            </div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(cat)}
                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => setDeleteId(cat._id)}
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


      </div>

      {/* ADD / EDIT MODAL */}
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2 className="text-lg font-semibold mb-4">
          {editingCategory ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          {/* IMAGE UPLOAD */}
          {/* <div className="mb-3">
            <label className="block text-sm mb-1">Upload Image</label>
            <input type="file" onChange={handleImageChange} />
            {formData.image && (
              <img
                src={formData.image}
                className="w-20 h-20 mt-2 rounded object-cover"
              />
            )}
          </div> */}

            <div className="mb-3 relative">
  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
    id="image-upload"
  />
  <label
    htmlFor="image-upload"
    className={`block w-full h-48 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
      formData.image
        ? 'border-green-300 bg-green-50'
        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
    }`}
  >
    {formData.image ? (
      <div className="flex flex-col items-center space-y-3">
        <div className="relative">
          <img
            src={formData.image}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Assuming you have a handleRemoveImage function
              handleRemoveImage?.();
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <span className="text-sm text-gray-600">Click to change image</span>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center text-gray-500">
        <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586 4.586a2 2 0 002.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L14 4m0 0L8 8m4-4v12m-4 0h12" />
        </svg>
        <p className="text-sm font-medium mb-1">Drop image here or click to browse</p>
        <p className="text-xs">PNG, JPG up to 10MB</p>
      </div>
    )}
  </label>
  {formData.image && (
    <p className="mt-2 text-xs text-gray-500">Image selected. Click above to replace.</p>
  )}
</div>

          <select
            className="w-full border p-2 mb-4 rounded"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button className="bg-purple-700 text-white px-4 py-2 rounded">
              {editingCategory ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRM MODAL */}
      <DeleteConfirmModal
        isOpen={!!deleteId}
        title="Delete Category"
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Categories;
