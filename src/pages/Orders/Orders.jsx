    // frontend/admin/src/pages/Orders/Orders.jsx

    import React from 'react'
    import './Orders.css'
    import { useState } from 'react'
    import {toast} from "react-toastify"
    import { useEffect } from 'react'
    import axios from "axios"
    import { assets } from '../../assets/assets'

    const Orders = ({url}) => {

        const [orders,setOrders] = useState([]);

        const fetchAllOrders = async () =>{
          const adminToken = localStorage.getItem('adminToken'); // <--- Get admin token
          if (!adminToken) {
              toast.error("Admin not authenticated. Please login.");
              // Optionally navigate to login
              return;
          }

          try {
            const response = await axios.get(url+"/api/order/list", { headers: { Authorization: `Bearer ${adminToken}` } }); // <--- Send token
            if(response.data.success){
              setOrders(response.data.data);
              console.log("Admin Orders fetched:", response.data.data);
            }
            else{
              toast.error("Error fetching orders")
            }
          } catch (error) {
            console.error("Network or API error fetching admin orders:", error);
            toast.error("Error fetching orders. Check console.");
          }
        }

        const statusHandler = async (event, orderId) => {
            const newStatus = event.target.value;
            const adminToken = localStorage.getItem('adminToken'); // <--- Get admin token
            if (!adminToken) {
                toast.error("Admin not authenticated. Please login.");
                return;
            }

            try {
                const response = await axios.post(url + "/api/order/status",
                    { orderId, status: newStatus },
                    { headers: { Authorization: `Bearer ${adminToken}` } } // <--- Send token
                );

                if (response.data.success) {
                    toast.success("Status Updated Successfully!");
                    await fetchAllOrders();
                } else {
                    toast.error("Failed to update status: " + (response.data.message || "Unknown error"));
                }
            } catch (error) {
                console.error("Error updating order status:", error);
                toast.error("Error updating status. Check console for details.");
            }
        };


    useEffect(()=>{
      fetchAllOrders();
    },[])

      return (
        <div className='order add'>
          <h3>Order Page</h3>
          <div className='order-list'>
            {orders.map((order,index)=>{
              return (
                <div key={order._id} className='order-item'>
                  <img src={assets.parcel_icon} alt="Parcel Icon" className="parcel-icon"/>

                  <div className="order-item-details-col1">
                    <p className='order-item-food'>
                      {order.items.map((item,item_index)=>{
                          if(item_index===order.items.length-1){
                            return item.name + " x " + item.quantity
                          }
                          else{
                            return item.name + " x " + item.quantity + ", "
                          }
                      })}
                    </p>
                    <p className="order-item-user-name">{order.address.firstName} {order.address.lastName}</p>
                    <p className="order-item-address">{order.address.street}</p>
                    <p className="order-item-address">{order.address.city}, {order.address.state}, {order.address.zipcode}</p>
                    <p className="order-item-address">{order.address.country}</p>
                    <p className="order-item-phone">{order.address.phone}</p>
                  </div>

                  <div className="order-item-count-col">
                    <p>Items: {order.items.length}</p>
                  </div>

                  <div className="order-item-amount-col">
                    <p>₹{order.amount}</p>
                  </div>

                  <div className="order-item-status-dropdown-col">
                    <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    export default Orders;
    