import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Activity, BookOpen, Leaf, Heart } from 'lucide-react';

const Dashboard = () => {
  const { userData } = useAuth();

  if (!userData) {
    return <div className="page container flex items-center justify-center">Loading profile...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 20px' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>
          Welcome back, {userData.name}!
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Here's your Ayurvedic wellness overview for today.
        </p>
      </header>

      <div className="grid grid-cols-3">
        {/* Profile Summary */}
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <div className="flex items-center gap-4 mb-4" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--primary-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {userData.name.charAt(0)}
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{userData.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{userData.email}</p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Dosha</h4>
            {userData.dosha ? (
              <div className="flex items-center gap-2 mt-4">
                <Leaf color="var(--primary-color)" />
                <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>{userData.dosha}</span>
              </div>
            ) : (
              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>You haven't discovered your Dosha yet.</p>
                <Link to="/dosha-test" className="btn btn-secondary mt-4" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Take the Test</Link>
              </div>
            )}
          </div>
          
          <div>
            <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Actions</h4>
            <div className="flex" style={{ flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
               <Link to="/diet-plan" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }} className="hover-bg">
                 <Activity size={18} color="var(--primary-color)" /> My Diet Plan
               </Link>
               <Link to="/chat" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }} className="hover-bg">
                 <Heart size={18} color="var(--accent-color)" /> Ask AI Advisor
               </Link>
            </div>
          </div>
        </div>

        {/* Daily Tip & Recommendations */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ backgroundColor: 'rgba(76, 175, 80, 0.05)', border: '1px solid rgba(76, 175, 80, 0.2)' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <BookOpen color="var(--primary-dark)" />
              <h3 style={{ margin: 0, color: 'var(--primary-dark)' }}>Daily Wellness Tip</h3>
            </div>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
              "Start your day with a glass of warm water and a slice of lemon to ignite your Agni (digestive fire) and flush out toxins."
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Recommended Herbs for {userData.dosha || 'You'}</h3>
            {userData.dosha ? (
              <p style={{ color: 'var(--text-secondary)' }}>Based on your Dosha, we recommend Ashwagandha for stress relief and Triphala for digestion. Visit the <Link to="/remedies">Herbs</Link> page to learn more.</p>
            ) : (
              <p style={{ color: 'var(--text-secondary)' }}>Take the Dosha test to see customized herbal recommendations.</p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
