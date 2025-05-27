"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function page() {
  const [blogs, setBlogs] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch("/api/blogs");

      if (res.ok) {
        const json = await res.json();
        setBlogs(json.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching data");
    }
  }

  useEffect(() => {
    fetchData()

  }, []);
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        {blogs.map((v) => (
          <div
            key={v._id}
            className="p-5 bg-gray-200 border-2 border-gray-200 hover:border-blue-500 rounded-lg"
          >
            <Link
              href={`/blogs/${v._id}`}
              className="text-lg font-semibold hover:underline duration-300"
            >
              {v.title}
            </Link>
          </div>
        ))}
      </div>

      <Toaster />
    </div>
  );
}
