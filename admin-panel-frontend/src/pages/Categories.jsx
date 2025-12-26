import { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'Active' });
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, name: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, formData);
      } else {
        await api.post('/categories', formData);
      }
      fetchCategories();
      setModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: '', status: 'Active' });
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, status: category.status });
    setModalOpen(true);
  };

  const handleDelete = (id, name) => setConfirmModal({ show: true, id, name });

  const confirmDelete = async () => {
    try {
      await api.delete(`/categories/${confirmModal.id}`);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
    setConfirmModal({ show: false, id: null, name: '' });
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', status: 'Active' });
    setModalOpen(true);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-t">
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">{category.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id, category.name)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {categories.map((category) => (
          <div key={category._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{category.name}</h3>
            <p className="text-gray-600">Status: {category.status}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(category)}
                className="text-blue-500 hover:underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id, category.name)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editingCategory ? 'Edit Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingCategory ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
      <ConfirmationModal
        isOpen={confirmModal.show}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${confirmModal.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ show: false, id: null, name: '' })}
      />
    </div>
  );
};

export default Categories;