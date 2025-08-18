import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Books from "../../assets/books.png";
import invoice from "../../assets/books1.png";
import { BookOpen, Store, CheckCircle } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { toASCII } from "punycode";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";


const COLORS = ["#d32f2f", "#fbc02d"];

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state)=>state.auth.user);
  // console.log("user",user);
  
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalSoldBooks, setTotalSoldBooks] = useState(0);
  const [totalSales, setTotalSales] = useState(null);
  const [recentActivity, setReceentActivity] = useState([]);
  const [salesAndRevenue, setSalesAndRevenue] = useState([]);
//   const salesAndRevenue = [
//   { month: "2025-01", total_sales: 5, total_revenue: 1200 },
//   { month: "2025-02", total_sales: 8, total_revenue: 1850 },
//   { month: "2025-03", total_sales: 3, total_revenue: 900 },
//   { month: "2025-04", total_sales: 10, total_revenue: 2500 },
//   { month: "2025-05", total_sales: 7, total_revenue: 1700 },
//   { month: "2025-06", total_sales: 4, total_revenue: 1100 },
//   { month: "2025-07", total_sales: 6, total_revenue: 1450 },
//   { month: "2025-08", total_sales: 2, total_revenue: 470 },
// ];

  const cards = [
    {
      Img: Books,
      label: "Total Books",
      val: totalBooks || 0,
    },
    {
      Img: invoice,
      label: "Total Books Sold",
      val: totalSoldBooks || 0,
    },
  ];
  // Prepare chart data
  const chartData = salesAndRevenue.map((item) => ({
    name: item.month,
    sales: item.total_sales,
    revenue: Number(item.total_revenue), // convert string to number
  }));

  //  const checkToken = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${import.meta.env.VITE_URL}/check-token`,
  //       { withCredentials: true } // ✅ important to send cookies
  //     );
  //     console.log("Token check result:", res.data);
  //     alert(JSON.stringify(res.data, null, 2));
  //   } catch (err) {
  //     console.error("Error checking token:", err);
  //   }
  // };

  

  const getHomePageData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/books/home-page-data`
      );
      console.log(response.data);

      if (response.data.success) {
        setTotalBooks(response.data.totalBooks);
        setTotalSoldBooks(response.data.totalSoldBooks);
        setTotalSales(response.data.totalSales);
        setReceentActivity(response.data.recentActivity);
        setSalesAndRevenue(response.data.salesAndRevenue);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong while Fetching data",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(totalBooks);
    console.log(cards);
  }, [totalBooks]);

  useEffect(() => {
    getHomePageData();
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 md:p-8 lg:p-8">
      {loading ? (
        ""
      ) : (
        <>
          <div>
            <h1 className="font-bold text-3xl">Dashboard</h1>
            <p className="text-lg">
              Track your sales, view recent activity, and take quick actions to
              manage books and vendors.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 rounded-xl">
            {cards.map((role, index) => {
              if (role.label === "Invoice") {
                return (
                  <Link to="/admin/invoices" key={index}>
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl flex flex-col gap-1 bg-gradient-to-b from-[#FFC7C7] to-[#D27070] cursor-pointer hover:bg-[#f0c0c0]">
                      <div className="w-16 h-16 bg-[#c1f7ff] rounded-full flex items-center justify-center mx-auto mb-4">
                        <img
                          src={role.Img}
                          alt={role.label}
                          className="w-10 h-10"
                        />
                      </div>

                      <h1 className="text-lg font-extrabold text-center mb-3">
                        {role.label}
                      </h1>

                      <div className="flex justify-center text-2xl font-bold">
                        <h1>{role.val}</h1>
                      </div>
                    </div>
                  </Link>
                );
              }
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl flex flex-col gap-1 bg-gradient-to-b from-[#FFC7C7] to-[#D27070]"
                >
                  <div className="w-16 h-16 bg-[#c1f7ff] rounded-full flex items-center justify-center mx-auto mb-4">
                    <img
                      src={role.Img}
                      alt={role.label}
                      className="w-10 h-10"
                    />
                  </div>

                  <h1 className="text-lg font-extrabold text-center mb-3">
                    {role.label}
                  </h1>

                  <div className="flex justify-center text-2xl font-bold">
                    <h1>{role.val}</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-[#e4e2e2] p-6 rounded-xl shadow-md space-y-4">
            <h1 className="font-bold text-2xl text-gray-800">
              Recent Activity
            </h1>

            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => {
                let IconComponent;
                let iconColor;

                if (activity.activity_type === "New Book Added") {
                  IconComponent = BookOpen;
                  iconColor = "text-black";
                } else if (
                  activity.activity_type === "New Vendor Registration"
                ) {
                  IconComponent = Store;
                  iconColor = "text-green-600";
                } else if (activity.activity_type === "Transaction Completed") {
                  IconComponent = CheckCircle;
                  iconColor = "text-purple-600";
                }

                return (
                  <div
                    key={index}
                    className="flex bg-[#D0BFBF] items-start gap-3 text-gray-700 p-2 rounded-md"
                  >
                    {IconComponent && (
                      <IconComponent className={`w-5 h-5 ${iconColor} mt-1`} />
                    )}
                    <p className="text-md w-full">
                      <span className="font-semibold">
                        {activity.activity_type}:
                      </span>{" "}
                      {activity.activity_type === "Transaction Completed"
                        ? `${activity.admin_name} purchased ${activity.title} by ${activity.author}.`
                        : `${activity.title} by ${activity.author}`}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No recent activity found.</p>
            )}
          </div>

         <div>
  <div className="bg-gray-100 p-4 rounded-xl shadow-md flex gap-4 items-center justify-between">
    {/* Bar Chart - Only Revenue */}
    <div className="w-1/2 h-32">
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar dataKey="revenue" fill="#fbc02d" name="Total Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Sidebar Text */}
    <div className="w-1/2 space-y-1 text-sm sm:text-base">
      <h2 className="font-semibold text-md sm:text-lg">
        Sales and Revenue Insights
      </h2>
      <p>
        <strong>Total Revenue:</strong> ₹ {totalSales}
      </p>
      <p>
        <strong>Total Sales:</strong> {totalSoldBooks} Books
      </p>
      {/* You can add more insights here if needed */}
    </div>
  </div>
</div>

        </>
      )}
    </div>
  );
}
export default Dashboard;
