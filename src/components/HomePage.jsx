import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "./ApiUrl";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location?.state || {};
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${ApiUrl}/getPosts/${user._id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(response)
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user._id) {
      fetchPosts();
    }
  }, [user._id]);

  const handleNavigate = () => {
    navigate("/postCreation", { state: user });
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 w-full h-16 flex items-center justify-between px-10 fixed top-0 shadow-md z-10">
        <h1 className="font-bold text-2xl text-white">Welcome, {user.name || "Guest"}</h1>
        <div className="flex gap-6">          
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => {
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-[70%] mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mt-6 mb-4">
          Recent Posts
        </h2>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <p className="text-lg text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-blue-600 truncate">
                  {post.title}
                </h3>
                <p className="text-gray-700 mt-2 line-clamp-3">
                  {post.content}
                </p>
                {/* <p className="text-sm text-gray-500 mt-4">
                  Created At: {new Date(post.createdAt).toLocaleString()}
                </p> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <p>No posts found. Be the first to create a post!</p>
          </div>
        )}

        {/* Create Post Button */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700"
            onClick={handleNavigate}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
