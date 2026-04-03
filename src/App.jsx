import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const audioRef = useRef(null);

  // 1. Music Play Logic
  const startSurprise = () => {
    setStep(2);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Music play failed:", err));
    }
  };

  // 2. Cursor Sparkle & Floating Hearts Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      sparkle.innerHTML = '✨'; // Aap '💖' bhi use kar sakte hain
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    };

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤️';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 3 + 3 + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const heartInterval = setInterval(createHeart, 600);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(heartInterval);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Background Music - public folder mein music.mp3 naam ki file rakhein */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="container">
        <div className="teddy">
          <img src="/photo.img/images-removebg-preview.png" alt="Family" />
        </div>
        <h1>Happy Family</h1>

        {step === 1 && (
          <button className="start-btn" onClick={startSurprise}>Click for a Surprise! ✨</button>
        )}

        {step >= 2 && (
          <div className="birthday-message animate-fade">
            <p>
              "To the heart of our happy family, <br />
              May your day be filled with endless joy and shared success. ❤️"
            </p>
            {step === 2 && <button className="next-btn" onClick={() => setStep(3)}>Next 📸</button>}
          </div>
        )}

        {step === 3 && <button onClick={() => setStep(4)}>Open Surprise Gallery 🎁</button>}

        {step === 4 && (
          <div className="swiper-wrapper animate-fade">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="mySwiper"
              loop={true}
              autoplay={{ delay: 2000 }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <SwiperSlide key={num}>
                  <img src={`/photo.img/${num}.jpeg`} alt={`Memory ${num}`} />
                </SwiperSlide>
              ))}
              <SwiperSlide><div className="last-slide">ENJOY Family! 🎈</div></SwiperSlide>
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;