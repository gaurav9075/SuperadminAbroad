// src/components/BlogModal.jsx
import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function BlogModal({ onClose, onSave, blogData }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (blogData) setForm(blogData);
  }, [blogData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleEditorChange = (content) => {
    setForm((prev) => ({ ...prev, description: content }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg mt-[100px]">
        <h2 className="text-xl font-semibold mb-4">
          {blogData ? "Edit Blog" : "Create Blog"}
        </h2>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleInput}
          placeholder="Title"
          className="w-full border px-3 py-2 mb-3 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleInput}
          className="w-full border px-3 py-2 mb-3 rounded"
        >
          <option value="">Select Category</option>
          <option value="CRM Software">CRM Software</option>
          <option value="Application">Application</option>
        </select>

        <Editor
          apiKey="iakkbk2l0wtnoutf9zpc73zw29doutn9vcpwgpx60wurt0la" // ✅ Your API key
          value={form.description}
          onEditorChange={handleEditorChange}
          init={{
            height: 200,
            menubar: false,
            plugins: [
              "advlist autolink lists link image",
              "charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | removeformat | help",
          }}
        />

        <input
          type="file"
          onChange={handleImage}
          className="mt-4 mb-2 border px-3 py-2 w-full rounded"
        />

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
