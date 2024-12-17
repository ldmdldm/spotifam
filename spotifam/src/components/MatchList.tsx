import React from 'react';
import { MatchDisplay } from './MatchDisplay';
import type { MatchResult } from '../types/spotify';

interface Props {
  matches: MatchResult[];
  loading: boolean;
}

export function MatchList({ matches, loading }: Props) {
  if (matches.length === 0 && !loading) {
    return (
      <div className="text-center text-gray-600">
        No matches found yet. You're the first one here! Share this app with your friends to find music matches.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {matches.map((match) => (
        <MatchDisplay key={match.matchedUser.id} matchResult={match} />
      ))}
    </div>
  );
}