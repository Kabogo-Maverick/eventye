import { useEffect, useState } from "react";
import api from "../api";
import "../styles/MyEvents.css"; // 💅

function MyEvents({ user }) {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image_url: ""
  });

  useEffect(() => {
    api.get("/events/mine")
      .then(res => setEvents(res.data))
      .catch(() => alert("Failed to fetch your events"));
  }, []);

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/events", formData);
      setEvents(prev => [res.data, ...prev]);
      setFormData({ title: "", description: "", date: "", image_url: "" });
    } catch {
      alert("Failed to create event");
    }
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      image_url: event.image_url || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", date: "", image_url: "" });
  };

  const saveEdit = async () => {
    try {
      const res = await api.patch(`/events/${editingId}`, formData);
      setEvents(events.map(e => e.id === editingId ? res.data : e));
      cancelEdit();
    } catch {
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents(e => e.filter(ev => ev.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleReserveAgain = (title) => {
    alert(`📅 You have rebooked "${title}"! We'll follow up with you.`);
  };

  const handleRemoveFromMine = async (id) => {
    if (!confirm("Remove this event from your list?")) return;
    try {
      await api.post(`/events/${id}/remove-from-mine`);
      setEvents(prev => prev.filter(e => e.id !== id));
      alert("🚫 Removed from your events.");
    } catch {
      alert("Failed to remove event.");
    }
  };

  return (
    <div className="my-events-container">
      <h2>My Events</h2>

      {/* Admin can create new events */}
      {user?.is_admin && (
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} />
          <button type="submit">➕ Add Event</button>
        </form>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map(e => (
          <li key={e.id} className="event-item">
            {/* Admin editing */}
            {user?.is_admin && editingId === e.id ? (
              <div className="edit-inputs">
                <input name="title" value={formData.title} onChange={handleChange} required />
                <input name="description" value={formData.description} onChange={handleChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input name="image_url" value={formData.image_url} onChange={handleChange} />
                <div className="event-actions">
                  <button onClick={saveEdit}>✅ Save</button>
                  <button onClick={cancelEdit}>❌ Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h4>{e.title}</h4>
                <p><strong>Date:</strong> {e.date}</p>
                <p>{e.description}</p>
                {e.image_url && (
                  <img
                    src={e.image_url}
                    alt={e.title}
                    style={{ width: "300px", maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }}
                  />
                )}

                <div className="event-actions">
                  {user?.is_admin ? (
                    <>
                      <button onClick={() => startEdit(e)}>✏️ Edit</button>
                      <button onClick={() => handleDelete(e.id)}>🗑 Delete</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleReserveAgain(e.title)}>📅 Reserve Again</button>
                      <button onClick={() => handleRemoveFromMine(e.id)} style={{ marginLeft: "0.5rem" }}>
                        ❌ Remove from My Events
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyEvents;
