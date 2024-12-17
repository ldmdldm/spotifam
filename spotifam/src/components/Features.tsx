import React from 'react';
import { Users, BarChart2, Heart } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function Features() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard
        icon={Users}
        title="Match with Music Fans"
        description="Find people who share your exact music taste, from guilty pleasures to rare finds."
      />
      <FeatureCard
        icon={BarChart2}
        title="Detailed Analysis"
        description="Get insights into your musical compatibility with genre breakdowns and artist matches."
      />
      <FeatureCard
        icon={Heart}
        title="Common Favorites"
        description="Discover shared favorite tracks and artists to instantly connect over music you both love."
      />
    </div>
  );
}