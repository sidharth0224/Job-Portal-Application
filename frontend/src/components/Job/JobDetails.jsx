import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/job/${id}`, {
          withCredentials: true,
        });
        setJob(res.data.job);
      } catch (error) {
        navigateTo("/notfound");
      }
    };

    fetchJob();
  }, [id, isAuthorized, navigateTo]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span>{job?.title || "N/A"}</span>
          </p>
          <p>
            Category: <span>{job?.category || "N/A"}</span>
          </p>
          <p>
            Country: <span>{job?.country || "N/A"}</span>
          </p>
          <p>
            City: <span>{job?.city || "N/A"}</span>
          </p>
          <p>
            Location: <span>{job?.location || "N/A"}</span>
          </p>
          <p>
            Description: <span>{job?.description || "No description available"}</span>
          </p>
          <p>
            Job Posted On: <span>{job?.jobPostedOn || "N/A"}</span>
          </p>
          <p>
            Salary:{" "}
            {job?.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job?.salaryFrom || "N/A"} - {job?.salaryTo || "N/A"}
              </span>
            )}
          </p>
          {user?.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job?._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
