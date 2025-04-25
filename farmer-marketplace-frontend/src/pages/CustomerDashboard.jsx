import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductList from '../components/ProductList';

const CustomerDashboard = () => {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const ordersPerPage = 3;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/payment/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const paidOrders = res.data.filter(order => order.status === 'Paid');
        setOrders(paidOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchProfile();
    fetchOrders();
  }, []);

  // Filtering by month
  const filterByMonth = order => {
    if (selectedMonth === 'all') return true;
    const orderMonth = new Date(order.createdAt).getMonth() + 1;
    return parseInt(selectedMonth) === orderMonth;
  };

  // Sorting by date
  const sortedAndFilteredOrders = [...orders]
    .filter(filterByMonth)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedAndFilteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedAndFilteredOrders.length / ordersPerPage);

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1);
  };

  const handleMonthChange = e => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="md:min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-green-700">
        🌾 Welcome, {user.name || "Customer"}!
      </h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded ${
            activeTab === "orders"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          📦 My Orders
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded ${
            activeTab === "profile"
              ? "bg-green-600 text-white"
              : "bg-white border"
          }`}
        >
          🧑 Profile
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        {activeTab === "products" && <ProductList />}

        {activeTab === "orders" && (
          <div>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <h2 className="text-xl font-semibold">📦 Your Paid Orders</h2>
              <div className="flex items-center gap-3">
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className="border border-green-300 rounded px-2 py-1"
                >
                  <option value="all">All Months</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

                <button
                  onClick={toggleSortOrder}
                  className="text-green-600 hover:text-green-800 text-sm underline"
                >
                  Sort: {sortOrder === "asc" ? "Oldest First" : "Newest First"}
                </button>
              </div>
            </div>

            {orders.length === 0 ? (
              <p className="text-gray-500">You have no paid orders yet.</p>
            ) : sortedAndFilteredOrders.length === 0 ? (
              <p className="text-gray-500">
                No orders found for selected month.
              </p>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-x-auto"
                >
                  <table className="min-w-full text-left bg-white shadow-md rounded-xl overflow-hidden">
                    <thead className="bg-green-100 text-green-700">
                      <tr>
                        <th className="py-3 px-6">Order Details</th>
                        <th className="py-3 px-6">Amount</th>
                        <th className="py-3 px-6">Date</th>
                        <th className="px-4 py-2">Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.map((order, idx) => (
                        <motion.tr
                          key={order._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="border-b hover:bg-green-50"
                        >
                          <td className="py-2 px-6">
                            <div className="font-medium text-green-700">
                              {order._id}
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              {order.products?.map((product, index) => (
                                <div key={index} className="mb-1">
                                  •{" "}
                                  <span className="font-semibold">
                                    {product?.name}
                                  </span>{" "}
                                  x {product?.quantity} — ₹{product?.price}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-2 px-6 text-green-800 font-bold">
                            ₹{order?.amount}
                          </td>
                          <td className="py-2 px-6">
                            {new Date(order?.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 rounded text-white text-xs ${
                                order.deliveryStatus === "Pending"
                                  ? "bg-yellow-500"
                                  : order.deliveryStatus === "Shipped"
                                  ? "bg-blue-500"
                                  : "bg-green-600"
                              }`}
                            >
                              {order.deliveryStatus}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-green-200 hover:bg-green-300 transition disabled:opacity-50"
                  >
                    ⬅ Previous
                  </button>
                  <span className="text-green-700 font-semibold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-green-200 hover:bg-green-300 transition disabled:opacity-50"
                  >
                    Next ➡
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">🧾 Your Profile Info</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
