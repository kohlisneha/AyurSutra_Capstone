import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Utensils, AlertCircle, CheckCircle, XCircle, Sparkles } from 'lucide-react';

const dietData = {
  Vata: {
    description: "Vata dosha is cold, dry, light, and airy. To balance Vata, favor foods that are warm, moist, heavy, and grounding.",
    favor: [
      "Warm, cooked foods",
      "Healthy fats (ghee, olive oil, sesame oil)",
      "Sweet, sour, and salty tastes",
      "Root vegetables (sweet potatoes, carrots)",
      "Warm spices (ginger, cinnamon, cardamom)",
      "Nuts and seeds",
      "Warm milk and herbal teas"
    ],
    avoid: [
      "Cold foods and drinks",
      "Raw vegetables and salads",
      "Dry snacks (crackers, popcorn)",
      "Bitter, astringent, and highly pungent tastes",
      "Excessive caffeine and stimulants"
    ]
  },
  Pitta: {
    description: "Pitta dosha is hot, sharp, and oily. To balance Pitta, favor foods that are cool, slightly dry, and mildly seasoned.",
    favor: [
      "Cooling foods and drinks",
      "Sweet, bitter, and astringent tastes",
      "Fresh, sweet fruits (melons, apples, pears)",
      "Leafy greens and cooling vegetables (cucumber, zucchini)",
      "Mild cooling spices (coriander, fennel, mint)",
      "Ghee and coconut oil in moderation",
      "Dairy products"
    ],
    avoid: [
      "Spicy, hot foods (chilies, cayenne)",
      "Sour and salty tastes",
      "Sour fruits (citrus, sour berries)",
      "Fermented foods (vinegar, yogurt, pickles)",
      "Fried and oily foods",
      "Garlic, onions, and excessive tomatoes"
    ]
  },
  Kapha: {
    description: "Kapha dosha is heavy, cold, moist, and slow. To balance Kapha, favor foods that are light, warm, dry, and stimulating.",
    favor: [
      "Warm, light, and dry foods",
      "Pungent, bitter, and astringent tastes",
      "Lots of vegetables (especially dark leafy greens)",
      "Warming spices (black pepper, ginger, chilies, garlic)",
      "Light fruits (apples, pears, pomegranate)",
      "Beans and legumes",
      "Honey (in moderation)"
    ],
    avoid: [
      "Heavy, cold, and oily foods",
      "Sweet, sour, and salty tastes",
      "Heavy dairy products (cheese, ice cream)",
      "Excessive nuts and seeds",
      "Refined sugar and heavy sweets",
      "Root vegetables and heavy starchy foods"
    ]
  }
};

const DietPlan = () => {
  const { userData } = useAuth();
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState(null);

  const userDosha = userData?.dosha;

  const generateAIPlan = () => {
    setLoadingAI(true);
    // Simulate API call to Genkit/Gemini
    setTimeout(() => {
      setAiGeneratedPlan({
        breakfast: "Warm oatmeal cooked with almond milk, topped with a pinch of cinnamon, cardamom, and a spoonful of ghee.",
        lunch: "Basmati rice with mung dal (kitchari), steamed asparagus, and a side of cooked sweet potatoes.",
        dinner: "Light vegetable soup with ginger and coriander, served with warm whole wheat flatbread.",
        snack: "Handful of soaked almonds and a cup of warm ginger tea.",
        tip: "Remember to eat your largest meal at lunchtime when your digestive fire (Agni) is strongest."
      });
      setLoadingAI(false);
    }, 2000);
  };

  if (!userDosha) {
    return (
      <div className="container page flex items-center justify-center flex-column h-100" style={{ minHeight: '60vh', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
        <Utensils size={64} color="var(--border-color)" />
        <h2>We don't know your Dosha yet!</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
          To provide a personalized Ayurvedic diet plan, we first need to understand your mind-body constitution.
        </p>
        <Link to="/dosha-test" className="btn btn-primary">Take the Dosha Assessment</Link>
      </div>
    );
  }

  const doshaData = dietData[userDosha];

  return (
    <div className="container page">
      <header className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          Your Ayurvedic Diet Plan <Utensils color="var(--primary-color)" />
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Personalized nutrition guidelines designed to bring your {userDosha} dosha back into harmony.
        </p>
      </header>

      <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
        
        {/* Core Guidelines */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
            <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              The {userDosha} Diet
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {doshaData.description}
            </p>

            <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success-color)', marginBottom: '1rem' }}>
                  <CheckCircle size={20} /> Foods to Favor
                </h3>
                <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {doshaData.favor.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--success-color)', marginTop: '0.2rem' }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error-color)', marginBottom: '1rem' }}>
                  <XCircle size={20} /> Foods to Minimize
                </h3>
                <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {doshaData.avoid.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--error-color)', marginTop: '0.2rem' }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="card" style={{ backgroundColor: 'rgba(255, 179, 0, 0.05)', border: '1px solid rgba(255, 179, 0, 0.2)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', marginBottom: '1rem' }}>
               <AlertCircle size={20} /> Important Note
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Ayurvedic nutrition is not about rigid restriction. It's about moderation and observing how different foods affect your body. Adjust these guidelines based on your digestion, the season, and your current state of balance.
            </p>
          </div>
        </div>

        {/* AI Generator Sidebar */}
        <div style={{ gridColumn: 'span 1' }}>
          <div className="card" style={{ background: 'linear-gradient(180deg, var(--surface-color) 0%, rgba(76, 175, 80, 0.05) 100%)', height: '100%' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
               <Sparkles size={20} color="var(--primary-color)" /> AI Meal Planner
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Want a specific example? Let our Ayurvedic AI generate a custom 1-day meal plan based on your {userDosha} constitution and current health goals.
            </p>
            
            {!aiGeneratedPlan && !loadingAI && (
              <button onClick={generateAIPlan} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Generate specific plan
              </button>
            )}

            {loadingAI && (
              <div className="text-center" style={{ padding: '2rem 0' }}>
                <Sparkles size={32} className="animate-pulse" color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Consulting Ayurvedic texts...</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Crafting your personalized menu</p>
              </div>
            )}

            {aiGeneratedPlan && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Breakfast</strong>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{aiGeneratedPlan.breakfast}</p>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Lunch</strong>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{aiGeneratedPlan.lunch}</p>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Dinner</strong>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{aiGeneratedPlan.dinner}</p>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Snack / Drink</strong>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{aiGeneratedPlan.snack}</p>
                </div>
                
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary-color)' }}>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--primary-dark)' }}>Tip:</strong>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{aiGeneratedPlan.tip}</p>
                </div>

                <button onClick={() => setAiGeneratedPlan(null)} className="btn btn-secondary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', padding: '0.5rem' }}>
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DietPlan;
