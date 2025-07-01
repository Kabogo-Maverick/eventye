import { useState } from "react";
import api from "../api";

function EventForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image_url: "", // ✅ Add image_url to form state
  });

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/events", formData);
      onAdd(res.data); // Update list in Home
      setFormData({ title: "", description: "", date: "", image_url: "" }); // ✅ Reset image field too
    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
