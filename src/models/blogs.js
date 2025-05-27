import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    imgId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);
export default Blog;
