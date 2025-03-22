import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/job/getall`, {
          withCredentials: true,
        });
        setJobs(data?.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigateTo]);

  if (loading) {
    return <div className="loading">Loading jobs...</div>;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.length > 0 ? (
            jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>Title: {element.title || "N/A"}</p>
                <p>Category: {element.category || "N/A"}</p>
                <p>Country: {element.country || "N/A"}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
