import React, { useState } from "react";
import Addenquiry from "./pages/Addenquiry";
import EinquiryList from "./EinquiryList";

export default function EnquirySystem() {
  const [enquiries, setEnquiries] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleAddEnquiry = (newEnquiry) => {
    setEnquiries([...enquiries, newEnquiry]);
    setShowList(false); // Hide list after adding
  };

  return (
    <div>
      <Addenquiry onSubmit={handleAddEnquiry} />
      <EinquiryList enquiries={enquiries} onShow={() => setShowList(true)} show={showList} />
    </div>
  );
}
