import React from 'react';
import { MapPin, Phone, Mail, Clock, Star, ExternalLink } from 'lucide-react';

const centers = [
  {
    id: 1,
    name: 'AyurSutra Wellness Center - Mumbai',
    image: '/ayurvedic_center_lobby_1773497604306.png',
    address: '102, Heritage Building, Bandra West, Mumbai, MH 400050',
    phone: '+91 22 4567 8901',
    email: 'mumbai@ayursutra.com',
    hours: '08:00 AM - 08:00 PM',
    rating: 4.8,
    reviews: 124,
    specialties: ['Panchakarma', 'Marma Therapy', 'Nadi Pariksha']
  },
  {
    id: 2,
    name: 'Heritage Healing Hub - Rishikesh',
    image: '/ayurvedic_treatment_room_1773497629545.png',
    address: 'Laxman Jhula Road, Near Ganga Bank, Rishikesh, UK 249001',
    phone: '+91 135 244 5566',
    email: 'rishikesh@ayursutra.com',
    hours: '06:00 AM - 09:00 PM',
    rating: 4.9,
    reviews: 312,
    specialties: ['Yoga Therapy', 'Meditation Retreats', 'Detox']
  },
  {
    id: 3,
    name: 'Lotus Ayurvedic Clinic - Bangalore',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1000',
    address: '45/A, 100ft Road, Indiranagar, Bangalore, KA 560038',
    phone: '+91 80 9876 5432',
    email: 'bangalore@ayursutra.com',
    hours: '09:00 AM - 07:00 PM',
    rating: 4.7,
    reviews: 89,
    specialties: ['Skin Care', 'Weight Loss', 'Herbal Pharmacy']
  }
];

const SessionCenters = () => {
  return (
    <div className="container page">
      <header className="text-center" style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary-dark)' }}>Our Session Centers</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1rem auto' }}>
          Discover our network of accredited Ayurvedic wellness centers providing authentic therapies and expert consultations across India.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '5rem' }}>
        {centers.map((center) => (
          <div key={center.id} className="card" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '0', padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '100%', minHeight: '300px' }}>
              <img 
                src={center.image} 
                alt={center.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ 
                position: 'absolute', 
                top: '1rem', 
                left: '1rem', 
                backgroundColor: 'rgba(255,255,255,0.95)', 
                padding: '0.5rem 1rem', 
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: '700',
                fontSize: '0.9rem'
              }}>
                <Star size={16} fill="var(--accent-color)" color="var(--accent-color)" /> {center.rating} ({center.reviews})
              </div>
            </div>

            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{center.name}</h2>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={18} color="var(--primary-color)" /> {center.address}
                  </p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => window.location.href='/appointments'}>
                  Book Session
                </button>
              </div>

              <div className="grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <Phone size={18} color="var(--primary-color)" /> {center.phone}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <Mail size={18} color="var(--primary-color)" /> {center.email}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <Clock size={18} color="var(--primary-color)" /> {center.hours}
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--primary-dark)' }}>Center Specialties:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {center.specialties.map(spec => (
                      <span key={spec} className="badge" style={{ backgroundColor: '#f0f4f0', color: 'var(--primary-dark)' }}>{spec}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                <a href="#" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  View on Map <ExternalLink size={14} />
                </a>
                <a href="#" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Full Details <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionCenters;
