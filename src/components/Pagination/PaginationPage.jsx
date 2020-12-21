import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Pagination from "../Pagination";

export default function PaginationPage() {
  const [isLoading, setLoading] = useState(false);
  const [airlines, setAirlines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const setPage = (num) => {
    setCurrentPage(num);
    fetchPosts(num);
  };

  const fetchPosts = (page = 1, size = 8) => {
    fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
    )
      .then(setLoading(true))
      .then((response) => response.json())
      .then((res) => {
        const airlines = res.data;
        setAirlines(airlines);
        setTotalPassengers(res.totalPassengers);
        setTotalPages(Math.ceil(res.totalPassengers / size));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h1 className="mb-20">Pagination</h1>
      {isLoading ? (
        <Loader className="full-height" />
      ) : (
        <>
          <div className="airlines-grid mb-20">
            {airlines.map((data) => (
              <div key={data._id} className="airlines-card">
                <div className="airline-logo__container">
                  <img
                    className="airline-logo"
                    src={data.airline.logo || data.airline[0].logo}
                    alt={data.airline.name || data.airline[0].name}
                  />
                </div>
                <div className="mb-10">
                  {data.airline.country || data.airline[0].country}
                </div>
                <div className="mb-10">
                  Established:{" "}
                  {data.airline.established || data.airline[0].established}
                </div>
                <div className="mb-10">
                  Head quaters:{" "}
                  {data.airline.head_quaters || data.airline[0].head_quaters}
                </div>
                <div className="mb-10">
                  {data.airline.name || data.airline[0].name}
                </div>
                <div className="mb-10">
                  {data.airline.slogan || data.airline[0].slogan}
                </div>
                <div className="mb-10">
                  <a
                    href={`https://${
                      data.airline.website || data.airline[0].website
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            total={totalPassengers}
            page={currentPage}
            totalPages={totalPages}
            pageNeighbours={1}
            onPageChanged={setPage}
          />
        </>
      )}
    </>
  );
}
