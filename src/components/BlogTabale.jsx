// src/components/BlogTable.jsx
import React from "react";

export default function BlogTabale({ blogs, onEdit, onDelete }) {
  return (
    <table className="w-[1300px] table-auto border text-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-4 py-2">Sr No</th>
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Image</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog, index) => (
          <tr key={index} className="text-center">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{blog.title}</td>
            <td className="border px-4 py-2">{blog.category}</td>
            <td className="border px-4 py-2">
              {blog.image && (
                <img
                  src={URL.createObjectURL(blog.image)}
                  alt="Blog"
                  className="h-12 w-16 object-cover mx-auto"
                />
              )}
            </td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEdit(index)}
                className="text-blue-500 hover:text-blue-700 mr-2"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
