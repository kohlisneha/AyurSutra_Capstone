import React, { useState, useEffect } from 'react';
import { apiGetHerbs, apiSeedHerbs } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { dummyHerbs } from '../data/dummyHerbs';
import { Leaf, Plus, RefreshCw, Search, AlertCircle, Database } from 'lucide-react';

// Dynamic mapping of herb names to local custom images
const imageOverrides = {
  "Ashwagandha (Withania somnifera)": "/images/herbs/ashwagandha.jpg",
  "Triphala": "/images/herbs/triphala.jpg",
  "Turmeric (Curcuma longa)": "/images/herbs/turmeric.jpg",
  "Brahmi (Bacopa monnieri)": "/images/herbs/brahmi.jpg",
  "Shatavari (Asparagus racemosus)": "/images/herbs/shatavari.jpg",
  "Tulsi (Holy Basil)": "/images/herbs/tulsi.jpg"
};

const Remedies = () => {
  const { userData } = useAuth();
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const fetchHerbs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetHerbs();
      setHerbs(data.herbs);
      setIsDemoMode(false);
    } catch (error) {
      console.error("Error fetching herbs:", error);
      setError("Could not connect to the herbal database server.");
      // Fallback to dummy data if server fails
      if (herbs.length === 0) {
        setHerbs(dummyHerbs);
        setIsDemoMode(true);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHerbs();
  }, []);

  const handleSeedData = async () => {
    setSeeding(true);
    setError(null);
    try {
      await apiSeedHerbs();
      await fetchHerbs();
    } catch (error) {
      console.error("Error seeding data:", error);
      setError("Failed to seed data. " + (error.message || ""));
    }
    setSeeding(false);
  };

  const filteredHerbs = herbs.filter(herb => 
    (herb.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (herb.benefits?.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="container page">
      <header className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Ayurvedic Herbal Remedies</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Explore our comprehensive database of natural herbs, their profound health benefits, and traditional Ayurvedic applications.
        </p>
      </header>

      {isDemoMode && (
        <div style={{ 
          backgroundColor: 'rgba(255, 152, 0, 0.1)', 
          color: '#e65100', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          border: '1px solid rgba(255, 152, 0, 0.2)'
        }}>
          <Database size={20} />
          <div style={{ flex: 1 }}>
            <strong>Offline Demo Mode:</strong> The server is currently unreachable. Showing local sample data instead.
          </div>
          <button onClick={fetchHerbs} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>
            Retry Connection
          </button>
        </div>
      )}

      {error && !isDemoMode && (
        <div style={{ 
          backgroundColor: 'rgba(244, 67, 54, 0.1)', 
          color: 'var(--error-color)', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <AlertCircle size={20} />
          <div>{error}</div>
        </div>
      )}

      <div className="flex justify-between items-center" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
          <input 
            type="text" 
            placeholder="Search herbs or benefits..." 
            className="input-field"
            style={{ width: '100%', paddingLeft: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {userData?.role === 'admin' && (
          <button className="btn btn-secondary">
            <Plus size={18} /> Add New Herb
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center" style={{ padding: '4rem 0' }}>
          <RefreshCw className="animate-spin" size={32} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
          <p>Loading herbal remedies...</p>
        </div>
      ) : herbs.length === 0 ? (
        <div className="card text-center" style={{ padding: '4rem 2rem' }}>
          <Leaf size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3>No herbs found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>The herbal database is currently empty.</p>
          <button 
            onClick={handleSeedData} 
            disabled={seeding}
            className="btn btn-primary"
          >
            {seeding ? 'Seeding Data...' : 'Seed Initial Data'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          {filteredHerbs.map(herb => {
            // DYNAMIC IMAGE OVERRIDE: 
            // If the herb name exists in our override map, use the local image.
            // Otherwise use the image from the database/API.
            const displayImage = imageOverrides[herb.name] || herb.image;
            const finalImageSrc = `${displayImage || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80'}?v=1`;

            return (
              <div key={herb.id || herb._id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '200px', width: '100%', backgroundColor: 'var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={finalImageSrc} 
                    alt={herb.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80'; 
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{herb.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '1rem' }}>
                    {herb.recommendedFor && herb.recommendedFor.map(dosha => (
                      <span key={dosha} style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-lg)', color: 'var(--text-secondary)' }}>
                        Good for {dosha}
                      </span>
                    ))}
                    {userData?.dosha && herb.recommendedFor?.includes(userData.dosha) && (
                      <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(76, 175, 80, 0.1)', color: 'var(--primary-dark)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-lg)', fontWeight: 'bold' }}>
                        Recommended for You
                      </span>
                    )}
                  </div>

                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{herb.description}</p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Key Benefits</h4>
                    <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                      {herb.benefits && herb.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>How to Use</h4>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>{herb.usageMethod}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Remedies;
