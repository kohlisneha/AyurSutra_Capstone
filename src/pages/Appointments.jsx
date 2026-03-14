import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, ChevronRight, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const centers = [
  { id: 1, name: 'AyurSutra Wellness Center - Mumbai', address: 'Bandra West, Mumbai, MH' },
  { id: 2, name: 'Heritage Healing Hub - Rishikesh', address: 'Laxman Jhula Road, Rishikesh, UK' },
  { id: 3, name: 'Lotus Ayurvedic Clinic - Bangalore', address: 'Indiranagar, Bangalore, KA' }
];

const sessions = [
  'Shirodhara (Mind Relaxation)',
  'Abhyanga (Herbal Massage)',
  'Panchakarma Consultation',
  'Nasya (Respiratory Care)',
  'General Ayurvedic Physician Checkup'
];

const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'];

const Appointments = () => {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    center: '',
    session: '',
    date: '',
    time: '',
    issue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container page" style={{ maxWidth: '600px', textAlign: 'center', paddingTop: '5rem' }}>
        <div className="card" style={{ padding: '4rem 2rem' }}>
          <CheckCircle size={80} color="var(--success-color)" style={{ marginBottom: '2rem' }} />
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Appointment Confirmed!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.2rem' }}>
            Namaste {currentUser?.displayName || 'User'}. Your session for <strong>{formData.session}</strong> at <strong>{formData.center}</strong> has been scheduled successfully.
          </p>
          <div style={{ backgroundColor: '#f0f9f1', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', textAlign: 'left' }}>
            <p><strong>Date:</strong> {formData.date}</p>
            <p><strong>Time:</strong> {formData.time}</p>
            <p><strong>Location:</strong> {formData.center}</p>
          </div>
          <button onClick={() => window.location.href = '/dashboard'} className="btn btn-primary" style={{ width: '100%' }}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container page" style={{ maxWidth: '800px' }}>
      <header className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Schedule an Appointment</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Book your traditional therapy session or medical consultation.</p>
      </header>

      {/* Progress Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '15px', left: 0, width: '100%', height: '2px', backgroundColor: '#e0e0e0', zIndex: -1 }}></div>
        <div style={{ position: 'absolute', top: '15px', left: 0, width: `${(step - 1) * 50}%`, height: '2px', backgroundColor: 'var(--primary-color)', zIndex: -1, transition: 'width 0.3s ease' }}></div>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '50%', 
            backgroundColor: step >= s ? 'var(--primary-color)' : '#e0e0e0', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '0.8rem'
          }}>
            {s}
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="animate-in">
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={24} color="var(--primary-color)" /> Select Center & Session
              </h2>
              
              <div className="form-group">
                <label>Wellness Center</label>
                <select 
                  className="input-field" 
                  value={formData.center} 
                  onChange={(e) => handleInputChange('center', e.target.value)}
                  required
                >
                  <option value="">Select a location</option>
                  {centers.map(center => <option key={center.id} value={center.name}>{center.name}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Therapy Session</label>
                <select 
                  className="input-field" 
                  value={formData.session} 
                  onChange={(e) => handleInputChange('session', e.target.value)}
                  required
                >
                  <option value="">Select a session type</option>
                  {sessions.map(session => <option key={session} value={session}>{session}</option>)}
                </select>
              </div>

              <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={nextStep} disabled={!formData.center || !formData.session}>
                Continue to Booking Details <ChevronRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in">
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarIcon size={24} color="var(--primary-color)" /> Choose Date & Time
              </h2>
              
              <div className="form-group">
                <label>Select Date</label>
                <input 
                  type="date" 
                  className="input-field" 
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>

              <label>Select Time Slot</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: formData.time === slot ? 'var(--primary-color)' : 'white',
                      color: formData.time === slot ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                    onClick={() => handleInputChange('time', slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={prevStep}>Back</button>
                <button type="button" className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.date || !formData.time}>
                  Final Step <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in">
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={24} color="var(--primary-color)" /> Additional Information
              </h2>
              
              <div className="form-group">
                <label>Briefly describe your health issue (Optional)</label>
                <textarea 
                  className="input-field" 
                  rows="4" 
                  placeholder="E.g. Persistent back pain, stress, digestive issues..."
                  value={formData.issue}
                  onChange={(e) => handleInputChange('issue', e.target.value)}
                ></textarea>
              </div>

              <div style={{ backgroundColor: '#f9f9f9', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Booking Summary:</h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <p><strong>Center:</strong> {formData.center}</p>
                  <p><strong>Session:</strong> {formData.session}</p>
                  <p><strong>Date & Time:</strong> {formData.date} at {formData.time}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={prevStep}>Back</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={isSubmitting}>
                  {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Appointments;
