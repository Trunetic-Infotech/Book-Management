import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (id) => {
    const order = orders.find((order) => order.id === id);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/buy-book/payment-details`,
        { withCredentials: true }
      );

      if (response.data && response.data.data) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error(error);
            Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error?.response?.data?.message || "Something went wrong while Fetching data",
                  });
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Orders</h2>
          <p>View and manage all orders placed by schools.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-300">
              <th className="py-2 px-4 border-b text-left">School Name</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Book Details</th>
              <th className="py-2 px-4 border-b text-left">Payment Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="bg-yellow-100">
                  <td className="py-2 px-4 border-b">{order.admin_name}</td>
                  <td className="py-2 px-4 border-b">
                   {new Date(order.created_at).toLocaleString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
})}

                  </td>
                  <td className="py-2 px-4 border-b">{order.amount_paid}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="text-sm text-gray-700 font-semibold">
                      {order.title}
                    </div>
                    <div className="text-xs text-gray-500">{order.author}</div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className="font-semibold text-green-500">
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2 hover:underline"
                      onClick={() => handleView(order.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 font-semibold"
                >
                  📦 No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div>
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>School Name:</strong> {selectedOrder.admin_name}
              </p>
              <p>
                <strong>Order Date:</strong>{' '}
                {new Date(selectedOrder.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Amount:</strong> {selectedOrder.amount_paid}
              </p>
              <p>
                <strong>Payment Status:</strong> {selectedOrder.payment_status}
              </p>
              <p>
                <strong>Book Title:</strong> {selectedOrder.title}
              </p>
              <p>
                <strong>Author:</strong> {selectedOrder.author}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
