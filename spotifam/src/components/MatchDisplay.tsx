import React, { useState } from 'react';
import { Heart, Music2, Clock, BarChart2, Users, Headphones, Sparkles, TrendingUp } from 'lucide-react';
import type { MatchResult } from '../types/spotify';

// ... (previous imports and component definitions)

function InsightsPanel({ insights, timeDistribution }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-medium text-green-800 mb-2">Musical Era Match</h5>
          <p className="text-green-600">
            You both love {insights.eraCompatibility} music!
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h5 className="font-medium text-purple-800 mb-2">Listening Style</h5>
          <p className="text-purple-600">
            {insights.listeningStyle} Music Fans
          </p>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-gray-800 mb-3">Era Distribution</h5>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(timeDistribution.byEra).map(([era, count]) => (
            <div key={era} className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg font-semibold text-gray-700">{count}</div>
              <div className="text-sm text-gray-500 capitalize">{era}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
        <h5 className="font-medium text-gray-800 mb-2">Collaboration Factor</h5>
        <div className="flex items-center">
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                style={{ width: `${insights.collaborationScore * 100}%` }}
              />
            </div>
          </div>
          <span className="ml-3 text-sm text-gray-600">
            {Math.round(insights.collaborationScore * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export function MatchDisplay({ matchResult }: Props) {
  const [activeTab, setActiveTab] = useState('overview');

  // ... (previous JSX)

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ... (previous header section) */}

      <div className="border-b border-gray-200">
        <nav className="flex">
          {['overview', 'insights', 'artists', 'genres', 'tracks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium text-center 
                         transition-colors hover:bg-gray-50 flex items-center justify-center gap-2
                         ${activeTab === tab 
                           ? 'text-green-600 border-b-2 border-green-600' 
                           : 'text-gray-500'}`}
            >
              {tab === 'insights' && <Sparkles className="w-4 h-4" />}
              {tab === 'artists' && <Users className="w-4 h-4" />}
              {tab === 'genres' && <Music2 className="w-4 h-4" />}
              {tab === 'tracks' && <Headphones className="w-4 h-4" />}
              {tab === 'overview' && <TrendingUp className="w-4 h-4" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'insights' && (
          <InsightsPanel 
            insights={matchResult.insights}
            timeDistribution={matchResult.timeDistribution}
          />
        )}
        
        {/* ... (previous tab content) */}
      </div>
    </div>
  );
}