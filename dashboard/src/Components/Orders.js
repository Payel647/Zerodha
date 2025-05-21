import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);
 const fetchOrders = () => {
    axios.get("https://zerodhabackend-petd.onrender.com/allOrders")
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };
  const handleDelete = (id) => {
    axios.delete(`https://zerodhabackend-petd.onrender.com/${id}`)
      .then(() => {
        setAllOrders((prevOrders) => prevOrders.filter(order => order._id !== id));
      })
      .catch((err) => console.error("Error deleting order:", err));
  };
  return (
      <div className="orders">
      <h3 className="title">Orders ({allOrders.length})</h3>
      {allOrders.length > 0 ? (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty.</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price}</td>
                  <td>
                  <button className="btn btn-blue" onClick={() => handleDelete(stock._id)}> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">Get Started</Link>
        </div>
      )}
    </div>
  );
};

export default Orders;