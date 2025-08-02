import React from "react";
import Books from "../../assets/books.png";

import invoice from "../../assets/invoice.png";
import { BookOpen, Store, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", sales: 4000, other: 2400 },
  { name: "Week 2", sales: 3000, other: 2210 },
  { name: "Week 3", sales: 2000, other: 2290 },
  { name: "Week 4", sales: 2780, other: 2000 },
  { name: "Week 5", sales: 1890, other: 2181 },
  { name: "Week 6", sales: 2390, other: 2500 },
  { name: "Week 7", sales: 3490, other: 2100 },
];

function Dashboard() {
  const roles = [
    {
      Img: Books,
      label: "Total Books",
    },
    {
      Img: invoice,
      label: "Invoice",
    },
    {
      icon: Books,
      label: "Total No Of Request",
    },
  ];

  return (
    <div className=" flex flex-col gap-5 p-4 sm:p-6 md:p-8 lg:p-8">
      <div>
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className=" text-lg">
          Track your sales, view recent activity, and take quick actions to
          manage books and vendors.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-5 rounded-xl ">
        {roles.map((role, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl flex flex-col gap-1 bg-gradient-to-b from-[#FFC7C7] to-[#D27070]"
            >
              <div className="w-16 h-16 bg-[#c1f7ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={role.Img} alt={role.label} className="w-10 h-10" />
              </div>

              <h1 className="text-lg fon-extrabold text-center  mb-3">
                {role.label}
              </h1>

              <div className="flex justify-center text-2xl font-bold ">
                <h1 className="">10</h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#e4e2e2] p-6 rounded-xl shadow-md space-y-4 ">
        <h1 className="font-bold text-2xl text-gray-800">Recent Activity</h1>

        <div className="flex bg-[#D0BFBF]  items-start gap-3 text-gray-700 p-2 rounded-md">
          <BookOpen className="w-5 h-5 text-black mt-1" />
          <p className="text-md w-full">
            <span className="font-semibold">New Book Added:</span> The Great
            Adventure by Vendor XYZ.
          </p>
        </div>

        <div className="flex bg-[#D0BFBF] items-start gap-3 text-gray-700 p-2 rounded-md">
          <Store className="w-5 h-5 text-green-600 mt-1" />
          <p className="text-md">
            <span className="font-semibold">New Vendor Registration:</span>
            John's BookStore.
          </p>
        </div>

        <div className="flex bg-[#D0BFBF] items-start gap-3 text-gray-700 p-2 rounded-md">
          <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
          <p className="text-md">
            <span className="font-semibold">Transaction Completed:</span> School
            ABC purchased 100 copies of Math 101.
          </p>
        </div>
      </div>

      <div>
        <div className="bg-gray-100 p-4 rounded-xl shadow-md flex gap-4 items-center justify-between">
          <div className="w-1/2 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#d32f2f"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="other"
                  stroke="#fbc02d"
                  strokeWidth={1.5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-1 text-sm sm:text-base">
            <h2 className="font-semibold text-md sm:text-lg">
              Sales and Revenue Insights
            </h2>
            <p>
              <strong>Total Sales:</strong> $5000
            </p>
            <p>
              <strong>Total Transactions:</strong> 200
            </p>
            <p>
              <strong>Top Vendor:</strong> XYZ Bookstore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
