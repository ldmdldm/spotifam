import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpotifyMatcher } from './components/SpotifyMatcher';
import { CallbackHandler } from './components/CallbackHandler';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { LoginButton } from './components/LoginButton';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';

function HomePage() {
  const { token } = useSpotifyAuth();

  return (
    <>
      <Layout>
        <Hero />
      </Layout>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 mb-12">
        <Features />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!token && (
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to find your music matches?
            </h2>
            <LoginButton variant="secondary" />
          </div>
        )}
        <SpotifyMatcher />
      </div>

      <footer className="bg-white mt-24">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Not affiliated with Spotify. Made with ♥️ for music lovers.
          </p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/callback" element={<CallbackHandler />} />
      </Routes>
    </BrowserRouter>
  );
}