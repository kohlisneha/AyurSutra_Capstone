import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, HeartPulse, Sparkles, BookOpen } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(129, 199, 132, 0.1) 0%, rgba(253, 251, 247, 1) 100%)',
        borderRadius: 'var(--radius-lg)',
        margin: '1rem',
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            Discover Your Natural Balance with AyurSutra
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            Your AI-powered Ayurvedic wellness companion. Discover natural remedies, personalized diet plans, and lifestyle wisdom based on ancient principles.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dosha-test" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Discover Your Dosha <ArrowRight size={20} />
            </Link>
            <Link to="/chat" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Talk to AI Advisor <Sparkles size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container" style={{ padding: '4rem 20px' }}>
        <h2 className="text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-primary)' }}>
          Wellness Rooted in Wisdom
        </h2>
        <div className="grid grid-cols-3">
          
          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(76, 175, 80, 0.1)', borderRadius: '50%', color: 'var(--primary-color)' }}>
              <HeartPulse size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Personalized Care</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Get tailored health advice, diet plans, and lifestyle recommendations based on your unique mind-body type (Dosha).
            </p>
          </div>

          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 179, 0, 0.1)', borderRadius: '50%', color: 'var(--accent-color)' }}>
              <Leaf size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Natural Remedies</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Explore a comprehensive database of Ayurvedic herbs, their benefits, and traditional usage methods for holistic healing.
            </p>
          </div>

          <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(62, 39, 35, 0.1)', borderRadius: '50%', color: 'var(--text-primary)' }}>
              <BookOpen size={40} />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Ancient Wisdom</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Access daily wellness tips, join community discussions, and deepen your understanding of the science of life.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section style={{ backgroundColor: 'var(--primary-dark)', color: 'white', padding: '4rem 20px', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Begin Your Ayurvedic Journey</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of others who have transformed their lives by embracing the timeless wisdom of Ayurveda.
          </p>
          <Link to="/signup" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary-dark)', padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
