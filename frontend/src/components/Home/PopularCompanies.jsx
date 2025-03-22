import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "SB Rd, Gachibowli, Hyderabad",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Ashok Nagar, Bengaluru, Karnataka",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "G1-G2, Jio World Drive, Bandra Kurla Complex, Bandra East, Mumbai",
      openPositions: 20,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "IBM",
      location: "Survey No 66/1, Raidurgam, Divyashree Tech Park, Divyashree Sez, Gachibowli",
      openPositions: 10,
      icon: <FaMicrosoft />,
    }
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
