"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function page() {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });
  let [picture, setpicture] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!title || !description || title == "" || description == "") {
        toast.error("All fields are required");
      }
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...blog, picture}),
      });

      if (res.ok) {
        setBlog({
          title: "",
          description: "",
          picture: ""
        });

        toast.success("Blog uploaded");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div>
          <CldUploadWidget
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(results) => {
              if (results.info?.secure_url && results.event === "success") {
                // Get the secure URL and public ID
                const { secure_url, public_id } = results.info;

                // Update the state with the URL and public ID
                setpicture({ url: secure_url, publicId: public_id });
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default behavior
                  open(); // Open the Cloudinary widget
                }}
                className="w-full border mt-2 border-[#E5E5E5] mb-3  rounded-md py-1"
              >
                {picture === "" ? (
                  "Add Your Picture"
                ) : (
                  <p className="text-green-700">Selected</p>
                )}
              </button>
            )}
          </CldUploadWidget>
        </div>
        <div className="mb-5">
          <label
            for="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="title"
            id="title"
            value={blog.title}
            onChange={(e) =>
              setBlog({ ...blog, title: e.target.value.trimStart() })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            type="description"
            id="description"
            value={blog.description}
            onChange={(e) =>
              setBlog({ ...blog, description: e.target.value.trimStart() })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Upload
        </button>
      </form>

      <Toaster />
    </div>
  );
}
