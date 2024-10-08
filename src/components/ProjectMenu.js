import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "../css/ProjectMenu.css";

const ProjectMenu = () => {
  const { projectId } = useParams();

  return (
    <div className="project-page-container">
      <div className="project-page">
        <div className="project-sidebar">
          <h1 className="project-head">Project Actions</h1>
          <p className="project-para">Choose an action:</p>
          <Link className="project-link" to={`project-dashboard/${projectId}`}>
            Dashboard
          </Link>
          <Link
            className="project-link"
            to={`viewprojectclientdetails/${projectId}`}
          >
            View Client Details
          </Link>
          <Link
            className="project-link"
            to={`add-team-member-to-project/${projectId}`}
          >
            Add Team Member To Project
          </Link>
          <Link
            className="project-link"
            to={`remove-team-member-from-project/${projectId}`}
          >
            Remove Team Member From Project
          </Link>
          <Link
            className="project-link"
            to={`assign-task-to-team-member/${projectId}`}
          >
            Assign Task to Team Member
          </Link>
          <Link className="project-link" to={`update-task/${projectId}`}>
            Update Task
          </Link>
          <Link className="project-link" to={`delete-task/${projectId}`}>
            Delete Task
          </Link>
          <Link className="project-link" to={`view-task-details/${projectId}`}>
            View Task Details
          </Link>
          <Link className="btn-primary11" to="/login">
            Logout
          </Link>
        </div>
        <div className="content" id="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProjectMenu;
