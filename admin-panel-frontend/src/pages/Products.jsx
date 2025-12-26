import { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [status, setStatus] = useState('Active');
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, name: '' });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryId) {
      setFilteredSubcategories(subcategories.filter(sub => (sub.categoryId._id || sub.categoryId.id) === categoryId));
    } else {
      setFilteredSubcategories([]);
    }
    // Reset subcategory if not in filtered
    if (subcategoryId && !filteredSubcategories.find(sub => (sub._id || sub.id) === subcategoryId)) {
      setSubcategoryId('');
    }
  }, [categoryId, subcategories, subcategoryId, filteredSubcategories]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, subRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
        api.get('/subcategories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      setSubcategories(subRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryId || !subcategoryId) {
      setError('Please select category and subcategory');
      return;
    }
    try {
      const data = { name, categoryId, subcategoryId, status };
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data);
      } else {
        await api.post('/products', data);
      }
      fetchData();
      setModalOpen(false);
      setEditingProduct(null);
      setName('');
      setCategoryId('');
      setSubcategoryId('');
      setStatus('Active');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategoryId(product.categoryId._id || product.categoryId.id);
    setSubcategoryId(product.subcategoryId._id || product.subcategoryId.id);
    setStatus(product.status);
    setModalOpen(true);
  };

  const handleDelete = (id, name) => setConfirmModal({ show: true, id, name });

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${confirmModal.id}`);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
    setConfirmModal({ show: false, id: null, name: '' });
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategoryId('');
    setSubcategoryId('');
    setStatus('Active');
    setModalOpen(true);
    setError('');
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error && !modalOpen) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Subcategory</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.categoryId?.name}</td>
                <td className="px-4 py-2">{product.subcategoryId?.name}</td>
                <td className="px-4 py-2">{product.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
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
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-600">Category: {product.categoryId?.name}</p>
            <p className="text-gray-600">Subcategory: {product.subcategoryId?.name}</p>
            <p className="text-gray-600">Status: {product.status}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-500 hover:underline mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id, product.name)}
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
          {editingProduct ? 'Edit Product' : 'Add Product'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select Category</option>
              {categories.map((category) => (
                <option key={category._id || category.id} value={category._id || category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subcategory</label>
            <select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
              disabled={!categoryId}
            >
              <option value="" disabled>Select Subcategory</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id || subcategory.id} value={subcategory._id || subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              {editingProduct ? 'Update' : 'Add'}
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

export default Products;