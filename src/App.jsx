import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import './App.css';

function App() {
  const [step, setStep] = useState(1); // 1: Button, 2: Wish, 3: Gallery Button, 4: Gallery

  // Mouse Sparkle effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      const icons = ["✨", "❤️", "🎈", "🍰"];
      sparkle.innerHTML = icons[Math.floor(Math.random() * icons.length)];
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-container">
      <div className="container">
        <div className="teddy">
          <img src="/photo.img/images-removebg-preview.png" alt="Family" />
        </div>
        <h1>Happy Family</h1>

        {/* STEP 1: Initial Button */}
        {step === 1 && (
          <button onClick={() => setStep(2)}>Click for a Surprise! ✨</button>
        )}

        {/* STEP 2 & 3: Wish Section */}
        {step >= 2 && (
          <div className="birthday-message animate-fade">
            <p>
              "To the heart of our happy family, <br />
              May your day be filled with endless joy and shared success. <br />
              May we always keep smiling together and shining bright. <br />
              May all the dreams you hold dear come true this year!" ❤️
            </p>
            {step === 2 && (
              <button className="next-btn" onClick={() => setStep(3)}>Next 📸</button>
            )}
          </div>
        )}

        {/* STEP 3: Gallery Button */}
        {step === 3 && (
          <button onClick={() => setStep(4)}>Open Surprise Gallery 🎁</button>
        )}

        {/* STEP 4: Swiper Gallery */}
        {step === 4 && (
          <div className="swiper-wrapper animate-fade">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="mySwiper"
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <SwiperSlide key={num}>
                  <img src={`/photo.img/${num}.jpeg`} alt={`Memory ${num}`} />
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <div className="last-slide">ENJOY Family! 🎈</div>
              </SwiperSlide>
            </Swiper>
          </div>
        )}
      </div>

      {/* Balloons component logic would go here or in CSS */}
    </div>
  );
}

export default App;