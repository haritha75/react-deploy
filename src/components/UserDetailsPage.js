import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "./config/api";
import "../css/UserDetailsPage.css";

const UserDetailsPage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/admin/users`);
        const allUsers = response.data;

        const filteredUsers = allUsers.filter(
          (users) => users.managerId === user.userId
        );

        setUserDetails(filteredUsers);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [user.userId]);

  return (
    <div className="user-details-container1">
      <br></br>
      {userDetails.length > 0 ? (
        <div className="user-details-table">
          <div className="user-details-header">
            <div>User Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Specialization</div>
            <div>Date of Joining</div>
          </div>
          <div className="user-details-body">
            {userDetails.map((user) => (
              <div key={user.userId} className="user-details-row">
                <div>{user.userName}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>{user.specialization}</div>
                <div>{new Date(user.dateOfJoining).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No users found for your management.</p>
      )}
    </div>
  );
};

export default UserDetailsPage;
