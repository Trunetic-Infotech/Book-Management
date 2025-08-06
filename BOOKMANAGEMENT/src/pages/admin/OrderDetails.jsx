import React, { useState } from 'react';

const OrderDetails = () => {
  const [orders, setOrders] = useState([
    { 
      OrderID: 'ORD12345',
      schoolName: 'ABC School',
      orderDate: '01/25/2025',
      totalAmt: "12000",
      paystatus: 'Paid'
    },
    { 
      OrderID: 'ORD12344',
      schoolName: 'XYZ School',
      orderDate: '01/25/2025',
      totalAmt: "15000",
      paystatus: 'Pending'
    },
    { 
      OrderID: 'ORD12347',
      schoolName: 'LMN School',
      orderDate: '01/25/2025',
      totalAmt: "8000",
      paystatus: 'Failed'
    },
    { 
      OrderID: 'ORD12348',
      schoolName: 'LMN School',
      orderDate: '01/25/2025',
      totalAmt: "8000",
      paystatus: 'Paid'
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleView = (orderID) => {
    const order = orders.find((order) => order.OrderID === orderID);
    setSelectedOrder(order); 
    setIsModalOpen(true); 
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null); 
  };
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
              <th className="py-2 px-4  border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">School Name</th>
              <th className="py-2 px-4 border-b text-left">Order Date</th>
              <th className="py-2 px-4 border-b text-left">Total Amount</th>
              <th className="py-2 px-4 border-b text-left">Payment Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.OrderID} className="bg-yellow-100">
                <td className="py-2 px-4 border-b">{order.OrderID}</td>
                <td className="py-2 px-4 border-b">{order.schoolName}</td>
                <td className="py-2 px-4 border-b">{order.orderDate}</td>
                <td className="py-2 px-4 border-b">{order.totalAmt}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`font-semibold ${
                      order.paystatus === 'Paid' ? 'text-green-500' : order.paystatus ==='Pending' ? 'text-purple-500':'text-red-400'}`}
                  >
                    {order.paystatus}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2 hover:underline"
                    onClick={() => handleView(order.OrderID)} 
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div>
              <p><strong>Order ID:</strong> {selectedOrder.OrderID}</p>
              <p><strong>School Name:</strong> {selectedOrder.schoolName}</p>
              <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
              <p><strong>Total Amount:</strong> ${selectedOrder.totalAmt}</p>
              <p><strong>Payment Status:</strong> {selectedOrder.paystatus}</p>
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