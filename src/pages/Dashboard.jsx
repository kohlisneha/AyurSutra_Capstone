import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Activity, BookOpen, Leaf, Heart, Calendar, Clock, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { userData } = useAuth();

  // Simulated appointments data
  const appointments = [
    {
      id: 1,
      center: 'AyurSutra Wellness Center - Mumbai',
      session: 'Abhyanga (Herbal Massage)',
      date: 'May 12, 2026',
      time: '10:30 AM',
      status: 'Confirmed'
    }
  ];

  if (!userData) {
    return <div className="page container flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.8rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
          Welcome back, {userData.name}!
        </h1>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent-color)', borderRadius: '2px' }}></div>
      </header>

      <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
        {/* Profile Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <div className="flex items-center gap-4 mb-4" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--primary-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(76, 175, 80, 0.2)'
              }}>
                {userData.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{userData.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>{userData.email}</p>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem' }}>Your Mind-Body Type</h4>
              {userData.dosha ? (
                <div className="flex items-center gap-3" style={{ padding: '0.75rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
                  <Leaf color="var(--primary-color)" size={24} />
                  <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{userData.dosha}</span>
                </div>
              ) : (
                <div style={{ marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>You haven't discovered your Dosha yet.</p>
                  <Link to="/dosha-test" className="btn btn-secondary mt-4" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Take the Test</Link>
                </div>
              )}
            </div>
            
            <div>
              <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem' }}>Quick Actions</h4>
              <div className="flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/diet-plan" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', transition: 'all 0.2s' }} className="hover-bg">
                  <Activity size={18} color="var(--primary-color)" /> 
                  <span style={{ fontWeight: '500' }}>My Diet Plan</span>
                </Link>
                <Link to="/chat" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', transition: 'all 0.2s' }} className="hover-bg">
                  <Heart size={18} color="var(--accent-color)" /> 
                  <span style={{ fontWeight: '500' }}>Ask AI Advisor</span>
                </Link>
                <Link to="/remedies" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 'var(--radius-md)', transition: 'all 0.2s' }} className="hover-bg">
                  <BookOpen size={18} color="var(--primary-dark)" /> 
                  <span style={{ fontWeight: '500' }}>Explore Herbs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Tip & Appointments */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ backgroundColor: 'var(--primary-dark)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <Leaf size={120} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1, transform: 'rotate(15deg)' }} />
            <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
              <BookOpen color="rgba(255,255,255,0.8)" size={24} />
              <h3 style={{ margin: 0, color: 'white', letterSpacing: '0.5px' }}>Daily Wellness Tip</h3>
            </div>
            <p style={{ fontSize: '1.25rem', fontStyle: 'italic', fontWeight: '300', lineHeight: '1.6' }}>
              "Start your day with a glass of warm water and a slice of lemon to ignite your Agni (digestive fire) and flush out toxins."
            </p>
          </div>

          {/* Appointments Section */}
          <div className="card">
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Calendar color="var(--primary-color)" /> Upcoming Appointments
              </h3>
              <Link to="/appointments" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Book New</Link>
            </div>

            {appointments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {appointments.map(apt => (
                  <div key={apt.id} style={{ 
                    padding: '1.25rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--border-color)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    alignItems: 'center',
                    gap: '1.5rem'
                  }}>
                    <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center', minWidth: '80px' }}>
                      <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>May</span>
                      <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)' }}>12</span>
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{apt.session}</h4>
                      <div className="flex gap-4" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {apt.center}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                      </div>
                    </div>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '50px', 
                      backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                      color: 'var(--primary-dark)', 
                      fontSize: '0.8rem', 
                      fontWeight: '600' 
                    }}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
                <Calendar size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p>No upcoming appointments. Ready for a session?</p>
              </div>
            )}
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
            <h3 style={{ marginBottom: '1rem' }}>Personalized Recommendations</h3>
            {userData.dosha ? (
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Based on your <strong>{userData.dosha}</strong> Dosha, we recommend daily meditation to balance your mind. 
                Consider incorporating <strong>Ashwagandha</strong> into your routine for better stress management.
              </p>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>Discover your Dosha type to receive personalized wellness and herbal recommendations tailored specifically for you.</p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
