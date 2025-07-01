import { useEffect, useState } from 'react';
import API from '../api';
import EventForm from '../components/EventForm';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer'; // ← Uncomment when Footer component is ready
import '../styles/Home.css';

function Home({ user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events')
      .then(res => setEvents(res.data))
      .catch(() => alert("Failed to load events"));
  }, []);

  const handleAdd = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter((e) => e.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const handleAddToMine = async (id) => {
    try {
      await API.post(`/events/${id}/add-to-mine`);
      alert("✅ Event added to your events!");
    } catch {
      alert("❌ Failed to add event to your list");
    }
  };

  return (
    <div className="home-container">
      {/* 🌸 Hero Header Section */}
      <HeroSection />

      {/* 🛠 Admin Event Creation */}
      {user?.is_admin && (
        <div className="create-section">
          <h3 style={{ color: "#c71585", fontFamily: "Playfair Display, serif" }}>
            Create New Event
          </h3>
          <EventForm onAdd={handleAdd} />
        </div>
      )}

      {/* 📅 Public Events List */}
      <div className="events-list">
        {events.map((e) => (
          <div className="event-card" key={e.id}>
            <h4>{e.title}</h4>
            <p><strong>Date:</strong> {e.date}</p>
            <p>{e.description}</p>

            {e.image_url && <img src={e.image_url} alt={e.title} />}

            <div className="button-group">
              {user?.is_admin ? (
                <button onClick={() => handleDelete(e.id)}>🗑 Delete</button>
              ) : (
                <button onClick={() => handleAddToMine(e.id)}>➕ Add to My Events</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ⬇️ Optional Footer (uncomment when ready) */}
      <Footer />
    </div>
  );
}

export default Home;
