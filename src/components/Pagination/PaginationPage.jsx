import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";

export default function PaginationPage() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const setPage = (num) => setCurrentPage(num);

  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(setLoading(true))
      .then((res) => res.json())
      .then((data) => {
        const posts = data.map((post) => post);
        setPosts(posts);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <>
      <h1 className="mb-20">Pagination</h1>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div>
            {currentPosts.map((post) => (
              <div key={post.id}>{post.title}</div>
            ))}
          </div>
          <Pagination
            total={posts.length}
            page={currentPage}
            totalPages={postsPerPage}
            pageNeighbours={1}
            onPageChanged={setPage}
          />
        </>
      )}
    </>
  );
}
