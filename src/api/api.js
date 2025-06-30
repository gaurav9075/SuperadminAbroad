const BASE_URL = "http://localhost:8080";

// === Token Header ===
export const authHeader = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
});


// === Auth APIs ===
export const loginSuperAdmin = async (credentials) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

export const loginBranch = async (credentials) => {
  try {
    const res = await fetch(`${BASE_URL}/branchlogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Branch Login Error:", err);
    return { message: "Server error during login." };
  }
};



export const registerSuperAdmin = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/superAdmin/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Registration Error:", err);
    throw err;
  }
};

// === Branch APIs ===
export const createBranch = async (branchData, superAdminEmail) => {
  try {
    const response = await fetch(
      `http://localhost:8080/createBranch?superAdminEmail=${superAdminEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`, // ✅ Include token if needed
        },
        body: JSON.stringify(branchData),
      }
    );

    if (!response.ok) {
      const text = await response.text(); // Show raw response for debugging
      throw new Error(`Request failed: ${response.status} - ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error("createBranch error:", error.message);
    return { success: false, message: error.message };
  }
};


export const getAllBranches = async () => {
  try {
    const response = await fetch("http://localhost:8080/getAllBranches", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch branches");

    const data = await response.json();

    // ✅ Correct: data itself is the array
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getAllBranches error:", err);
    return [];
  }
};




export const getBranchById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/getBranchById/${id}`, {
      headers: authHeader(),
    });
    return await res.json();
  } catch (err) {
    console.error("Get Branch By ID Error:", err);
    throw err;
  }
};

export const updateBranch = async (id, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/updateBranch/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify(updateData),
    });
    return await res.json();
  } catch (err) {
    console.error("Update Branch Error:", err);
    throw err;
  }
};

export const deleteBranch = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/deleteBranch/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      const text = await res.text();
      return { success: true, message: text };
    }
  } catch (err) {
    console.error("Delete Branch Error:", err);
    throw err;
  }
};


// === Permissions & Codes ===
export const getBranchCodeByEmail = async (email) => {
  try {
    const res = await fetch(`${BASE_URL}/branch/getbranchcode?email=${email}`, {
      headers: authHeader(),
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error ${res.status}: ${text}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      const text = await res.text();
      return { success: true, message: text }; // fallback
    }
  } catch (err) {
    console.error("Branch Code Error:", err);
    throw err;
  }
};


export const getPermissionForBranch = async (branchEmail) => {
  try {
    const res = await fetch(`${BASE_URL}/permissionForBranch?branchEmail=${branchEmail}`, {
      headers: authHeader(),
    });
    return await res.json();
  } catch (err) {
    console.error("Permission for Branch Error:", err);
    throw err;
  }
};

export const getPermissionForSuperAdmin = async (email) => {
  try {
    const res = await fetch(`${BASE_URL}/superAdmin/permissionForAdmin?email=${email}`, {
      headers: authHeader(),
    });
    return await res.json();
  } catch (err) {
    console.error("Permission for SuperAdmin Error:", err);
    throw err;
  }
};

// === Forgot Password Flow ===
export const sendOtp = async (email) => {
  try {
    const res = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // ✅ Send email in JSON body
    });

    const text = await res.text();
    console.log("sendOtp response:", text);

    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  } catch (err) {
    console.error("Send OTP Error:", err);
    throw err;
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const res = await fetch(
      `${BASE_URL}/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`,
      {
        method: "POST",
      }
    );

    const text = await res.text();
    console.log("resetPassword raw response:", text);

    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  } catch (err) {
    console.error("Reset Password Error:", err);
    throw err;
  }
};


//this is for add enquiry 


// Submit a new enquiry (with image)
export const createEnquiry = async (formData, role, email) => {
  const body = new FormData();
  const enquiryData = {
    name: formData.name,
    phone_no: formData.phone,
    email: formData.email,
    address: "N/A",
    landmark: "N/A",
    state: "N/A",
    district: "N/A",
    continent: formData.continent,
    country: formData.country,
    course: formData.course,
    enquiry_date: new Date().toISOString().split("T")[0],
    photoUrl: formData.photo ? formData.photo.name : "",
    createdByEmail: email,
    role,
    branchCode: formData.branch,
  };

  body.append("enquiry", JSON.stringify(enquiryData));
  if (formData.photo) {
    body.append("image", formData.photo);
  }

  const response = await fetch(
    `${BASE_URL}/createEnquiry?role=${role}&email=${email}`,
    {
      method: "POST",
      body,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create enquiry");
  }

  return await response.json();
};

// Get all enquiries
export const getAllEnquiries = async (role, email) => {
  const res = await fetch(
    `${BASE_URL}/getAllEnquiries?role=${role}&email=${email}`
  );

  if (!res.ok) throw new Error("Failed to fetch enquiries");

  return await res.json();
};

// Get enquiry by ID
export const getEnquiryById = async (id, role, email) => {
  const res = await fetch(
    `${BASE_URL}/getEnquiryById/${id}?role=${role}&email=${email}`
  );

  if (!res.ok) throw new Error("Failed to fetch enquiry");

  return await res.json();
};

// Update enquiry
export const updateEnquiry = async (id, formData, role, email) => {
  const body = new FormData();
  const enquiryData = {
    name: formData.name,
    phone_no: formData.phone,
    email: formData.email,
    address: "N/A",
    landmark: "N/A",
    state: "N/A",
    district: "N/A",
    continent: formData.continent,
    country: formData.country,
    course: formData.course,
    enquiry_date: formData.enquiry_date || new Date().toISOString().split("T")[0],
    photoUrl: formData.photo ? formData.photo.name : "",
    createdByEmail: email,
    role,
    branchCode: formData.branch,
  };

  body.append("enquiry", JSON.stringify(enquiryData));
  if (formData.photo) {
    body.append("image", formData.photo);
  }

  const res = await fetch(
    `${BASE_URL}/updateEnquiry/${id}?role=${role}&email=${email}`,
    {
      method: "PUT",
      body,
    }
  );

  if (!res.ok) throw new Error("Failed to update enquiry");

  return await res.json();
};

// Delete enquiry
export const deleteEnquiry = async (id, role, email) => {
  const res = await fetch(
    `${BASE_URL}/deleteEnquiry/${id}?role=${role}&email=${email}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete enquiry");

  return await res.text();
};
