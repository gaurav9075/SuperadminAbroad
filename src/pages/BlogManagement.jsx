// src/pages/BlogManagement.jsx
import React, { useState } from "react";
import BlogTable from "../components/BlogTabale";
import BlogModal from "../components/BlogModal";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSave = (blogData) => {
    if (editingIndex !== null) {
      const updated = [...blogs];
      updated[editingIndex] = blogData;
      setBlogs(updated);
    } else {
      setBlogs([...blogs, blogData]);
    }
    setShowModal(false);
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const confirm = window.confirm("Are you sure to delete this blog?");
    if (confirm) setBlogs(blogs.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6  mt-24 ">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded shadow mb-4 hover:bg-blue-700"
      >
        CREATE NEW BLOG
      </button>

      <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <BlogModal
          blogData={editingIndex !== null ? blogs[editingIndex] : null}
          onClose={() => {
            setShowModal(false);
            setEditingIndex(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
