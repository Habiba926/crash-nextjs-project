'use client';
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function details({params}){
     const [blogs, setBlogs] = useState({});

  async function fetchData() {
    try {
      const res = await fetch(`/api/blogs/${params.details}`);

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
    fetchData();
  }, []);

    return(
        <div>
            <h1 className="text-2xl font-bold">{blogs?.title}</h1>
            <p className="text-lg mt-5">{blogs?.description}</p>

            <Toaster />
        </div>
    )
}