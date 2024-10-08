import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/ClientDetailsPage.css";
import api from "./config/api";

const ClientDetailsPage = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [clientDetails, setClientDetails] = useState([]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const projectsResponse = await api.get(
          `/projects/by-manager/${user.userId}`
        );
        const projects = projectsResponse.data;

        const clientIds = Array.from(
          new Set(projects.map((project) => project.client.clientId))
        );

        const clientDetailsPromises = clientIds.map((clientId) =>
          api.get(`/clients/${clientId}`)
        );
        const clientDetailsArray = await Promise.all(clientDetailsPromises);

        setClientDetails(clientDetailsArray.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    fetchClientDetails();
  }, [user.userId]);

  return (
    <div className="client-details-container">
      <br></br>
      {clientDetails.length > 0 ? (
        <div className="client-details-table">
          <div className="client-details-header">
            <div>Client Name</div>
            <div>Company Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Created At</div>
            <div>Updated At</div>
          </div>
          <div className="client-details-body">
            {clientDetails.map((client) => (
              <div key={client.clientId} className="client-details-row">
                <div>{client.clientName}</div>
                <div>{client.clientCompanyName}</div>
                <div>{client.clientEmail}</div>
                <div>{client.clientPhone}</div>
                <div>{new Date(client.createdAt).toLocaleString()}</div>
                <div>{new Date(client.updatedAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No clients found for your projects.</p>
      )}
    </div>
  );
};

export default ClientDetailsPage;
