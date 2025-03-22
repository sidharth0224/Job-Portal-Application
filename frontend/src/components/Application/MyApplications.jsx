import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  
  const navigateTo = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchApplications = async () => {
      if (!isAuthorized) {
        navigateTo("/");
        return;
      }

      try {
        const endpoint = user?.role === "Employer" 
          ? `${BACKEND_URL}/api/v1/application/employer/getall`
          : `${BACKEND_URL}/api/v1/application/jobseeker/getall`;

        const { data } = await axios.get(endpoint, {
          withCredentials: true,
        });

        setApplications(data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      }
    };

    fetchApplications();

    // Cleanup to prevent memory leaks
    return () => setApplications([]);
  }, [isAuthorized, user, navigateTo, BACKEND_URL]);

  const deleteApplication = async (id) => {
    try {
      const { data } = await axios.delete(
        `${BACKEND_URL}/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );

      toast.success(data.message);
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  if (!isAuthorized) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <section className="my_applications page">
      <div className="container">
        <center>
          <h1>{user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}</h1>
        </center>

        {applications.length === 0 ? (
          <center>
            <h4>No Applications Found</h4>
          </center>
        ) : (
          applications.map((element) => (
            <ApplicationCard
              key={element._id}
              element={element}
              deleteApplication={deleteApplication}
              openModal={openModal}
              isEmployer={user?.role === "Employer"}
            />
          ))
        )}
      </div>

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const ApplicationCard = ({ element, deleteApplication, openModal, isEmployer }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>CoverLetter:</span> {element.coverLetter}</p>
    </div>

    <div className="resume">
      <img
        src={element.resume.url}
        alt="resume"
        onClick={() => openModal(element.resume.url)}
        style={{ cursor: "pointer" }}
      />
    </div>

    {!isEmployer && (
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    )}
  </div>
);
