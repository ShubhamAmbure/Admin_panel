// import { useState, useEffect } from 'react';
// import api from '../services/api';
// import Modal from '../components/Modal';

// const Subcategories = () => {
//   // ... existing code ...

//   useEffect(() => {
//     document.title = 'Subcategories';
//   }, []);
//   const [subcategories, setSubcategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingSubcategory, setEditingSubcategory] = useState(null);
//   const [name, setName] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [status, setStatus] = useState('Active');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [subRes, catRes] = await Promise.all([
//         api.get('/subcategories'),
//         api.get('/categories')
//       ]);
//       setSubcategories(subRes.data);
//       setCategories(catRes.data);
//     } catch (err) {
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!categoryId) {
//       setError('Please select a category');
//       return;
//     }
//     try {
//       const data = { name, categoryId, status };
//       if (editingSubcategory) {
//         await api.put(`/subcategories/${editingSubcategory._id}`, data);
//       } else {
//         await api.post('/subcategories', data);
//       }
//       fetchData();
//       setModalOpen(false);
//       setEditingSubcategory(null);
//       setName('');
//       setCategoryId('');
//       setStatus('Active');
//       setError('');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Operation failed');
//     }
//   };

//   const handleEdit = (subcategory) => {
//     setEditingSubcategory(subcategory);
//     setName(subcategory.name);
//     setCategoryId(subcategory.categoryId._id || subcategory.categoryId.id);
//     setStatus(subcategory.status);
//     setModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this subcategory?')) {
//       try {
//         await api.delete(`/subcategories/${id}`);
//         fetchData();
//       } catch (err) {
//         setError(err.response?.data?.message || 'Delete failed');
//       }
//     }
//   };

//   const openAddModal = () => {
//     setEditingSubcategory(null);
//     setName('');
//     setCategoryId('');
//     setStatus('Active');
//     setModalOpen(true);
//     setError('');
//   };

//   if (loading) return <div className="text-center py-4">Loading...</div>;
//   if (error && !modalOpen) return <div className="text-center py-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Subcategories</h1>
//         <button
//           onClick={openAddModal}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Subcategory
//         </button>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden lg:block">
//         <table className="w-full bg-white shadow-md rounded">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Category</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subcategories.map((subcategory) => (
//               <tr key={subcategory._id} className="border-t">
//                 <td className="px-4 py-2">{subcategory.name}</td>
//                 <td className="px-4 py-2">{subcategory.categoryId?.name}</td>
//                 <td className="px-4 py-2">{subcategory.status}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleEdit(subcategory)}
//                     className="text-blue-500 hover:underline mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(subcategory._id)}
//                     className="text-red-500 hover:underline"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-4">
//         {subcategories.map((subcategory) => (
//           <div key={subcategory._id} className="bg-white p-4 rounded shadow">
//             <h3 className="font-bold">{subcategory.name}</h3>
//             <p className="text-gray-600">Category: {subcategory.categoryId?.name}</p>
//             <p className="text-gray-600">Status: {subcategory.status}</p>
//             <div className="mt-2">
//               <button
//                 onClick={() => handleEdit(subcategory)}
//                 className="text-blue-500 hover:underline mr-4"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(subcategory._id)}
//                 className="text-red-500 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//         <h2 className="text-xl font-bold mb-4">
//           {editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}
//         </h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Category</label>
//             <select
//               value={categoryId}
//               onChange={(e) => setCategoryId(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="" disabled>Select Category</option>
//               {categories.map((category) => (
//                 <option key={category._id || category.id} value={category._id || category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Status</label>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={() => setModalOpen(false)}
//               className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               {editingSubcategory ? 'Update' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default Subcategories;








// import { useState, useEffect } from "react";
// import api from "../services/api";
// import Modal from "../components/Modal";
// import DeleteConfirmModal from "../components/DeleteConfirmModal";

// const Subcategories = () => {
//   const [subcategories, setSubcategories] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingSubcategory, setEditingSubcategory] = useState(null);

//   const [deleteId, setDeleteId] = useState(null);

//   const [name, setName] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [status, setStatus] = useState("Active");

//   useEffect(() => {
//     document.title = "Subcategories";
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [subRes, catRes] = await Promise.all([
//         api.get("/subcategories"),
//         api.get("/categories"),
//       ]);
//       setSubcategories(subRes.data);
//       setCategories(catRes.data);
//     } catch {
//       setError("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAddModal = () => {
//     setEditingSubcategory(null);
//     setName("");
//     setCategoryId("");
//     setStatus("Active");
//     setError("");
//     setModalOpen(true);
//   };

//   const handleEdit = (sub) => {
//     setEditingSubcategory(sub);
//     setName(sub.name);
//     setCategoryId(sub.categoryId?._id);
//     setStatus(sub.status);
//     setModalOpen(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!categoryId) {
//       setError("Please select a category");
//       return;
//     }

//     const payload = { name, categoryId, status };

//     if (editingSubcategory) {
//       await api.put(`/subcategories/${editingSubcategory._id}`, payload);
//     } else {
//       await api.post("/subcategories", payload);
//     }

//     fetchData();
//     setModalOpen(false);
//   };

//   const confirmDelete = async () => {
//     await api.delete(`/subcategories/${deleteId}`);
//     setDeleteId(null);
//     fetchData();
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error && !modalOpen)
//     return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Subcategories
//         </h1>
//         <button
//           onClick={openAddModal}
//           className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800"
//         >
//           + Add Subcategory
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {subcategories.length === 0 ? (
//           <p className="p-6 text-center text-gray-500">
//             No subcategories found
//           </p>
//         ) : (
//           <table className="w-full">
//             <thead className="bg-gray-100 text-sm text-gray-600">
//               <tr>
//                 <th className="px-6 py-3 text-left">Name</th>
//                 <th className="px-6 py-3 text-left">Category</th>
//                 <th className="px-6 py-3 text-left">Status</th>
//                 <th className="px-6 py-3 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subcategories.map((sub) => (
//                 <tr key={sub._id} className="border-t hover:bg-gray-50">
//                   <td className="px-6 py-4">{sub.name}</td>
//                   <td className="px-6 py-4">{sub.categoryId?.name}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 text-xs rounded-full ${
//                         sub.status === "Active"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {sub.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right space-x-4">
//                     <button
//                       onClick={() => handleEdit(sub)}
//                       className="text-blue-600 hover:underline"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => setDeleteId(sub._id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Add/Edit Modal */}
//       <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//         <h2 className="text-lg font-semibold mb-4">
//           {editingSubcategory ? "Edit Subcategory" : "Add Subcategory"}
//         </h2>

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full border rounded-md px-3 py-2"
//             placeholder="Subcategory Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <select
//             className="w-full border rounded-md px-3 py-2"
//             value={categoryId}
//             onChange={(e) => setCategoryId(e.target.value)}
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <select
//             className="w-full border rounded-md px-3 py-2"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>

//           <div className="flex justify-end gap-3 pt-2">
//             <button
//               type="button"
//               onClick={() => setModalOpen(false)}
//               className="px-4 py-2 text-gray-600"
//             >
//               Cancel
//             </button>
//             <button className="bg-purple-700 text-white px-4 py-2 rounded-md">
//               {editingSubcategory ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         isOpen={!!deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={confirmDelete}
//         title="Delete Subcategory"
//       />
//     </div>
//   );
// };

// export default Subcategories;













import { useState, useEffect } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const Subcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("Active");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [subRes, catRes] = await Promise.all([
      api.get("/subcategories"),
      api.get("/categories"),
    ]);
    setSubcategories(subRes.data);
    setCategories(catRes.data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditing(null);
    setName("");
    setCategoryId("");
    setStatus("Active");
    setImagePreview(null);
    setModalOpen(true);
  };

  const openEdit = (sub) => {
    setEditing(sub);
    setName(sub.name);
    setCategoryId(sub.categoryId?._id);
    setStatus(sub.status);
    setImagePreview(sub.image || null);
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
      status,
      image: imagePreview,
    };

    if (editing) {
      await api.put(`/subcategories/${editing._id}`, payload);
    } else {
      await api.post("/subcategories", payload);
    }

    setModalOpen(false);
    fetchData();
  };

  const confirmDelete = async () => {
    await api.delete(`/subcategories/${deleteId}`);
    setDeleteOpen(false);
    fetchData();
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Sub Category</h1>
        <button
          onClick={openAdd}
          className="bg-purple-700 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {/* <table className="w-full bg-white rounded shadow">
        <thead className="bg-yellow-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Image</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((s) => (
            <tr key={s._id} className="border-t">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.categoryId?.name}</td>
              <td className="p-2">
                <img
                  src={s.image || "https://via.placeholder.com/50"}
                  className="w-10 h-10 rounded object-cover"
                />
              </td>
              <td
                className={`p-2 ${
                  s.status === "Active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {s.status}
              </td>
              <td className="p-2 space-x-2">
                <button onClick={() => openEdit(s)}>✏️</button>
                <button
                  onClick={() => {
                    setDeleteId(s._id);
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
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
        <th className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {subcategories.map((s) => (
        <tr key={s._id} className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {s.name}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {s.categoryId?.name || 'N/A'}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex justify-center">
              <img
                src={s.image || "https://via.placeholder.com/50x50?text=No+Image"}
                alt={s.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
            </div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm">
            <div className="flex justify-center">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  s.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {s.status}
              </span>
            </div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => openEdit(s)}
                className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  setDeleteId(s._id);
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
          {editing ? "Edit Sub Category" : "Add Sub Category"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2"
            placeholder="Subcategory name"
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

          {/* IMAGE ADD-ON */}
          {/* <input type="file" onChange={handleImage} />
          {imagePreview && (
            <img src={imagePreview} className="w-20 h-20 rounded" />
          )} */}

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

      {/* DELETE CONFIRM */}
      <DeleteConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Sub Category"
      />
    </div>
  );
};

export default Subcategories;
