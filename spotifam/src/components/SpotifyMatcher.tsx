import React from 'react';
import { LoginButton } from './LoginButton';
import { UserProfile } from './UserProfile';
import { MatchList } from './MatchList';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import { useUserData } from '../hooks/useUserData';

export function SpotifyMatcher() {
  const { token, isInitialized, error: authError, logout } = useSpotifyAuth();
  const { profile, matches, loading, error: dataError } = useUserData(token);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  if (authError) {
    return <ErrorMessage message={authError} />;
  }

  if (dataError) {
    return <ErrorMessage message={dataError} />;
  }

  if (!token) {
    return (
      <div className="text-center">
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {loading && <LoadingSpinner />}
      {profile && (
        <>
          <div className="flex justify-between items-center">
            <UserProfile profile={profile} />
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 
                         bg-white hover:bg-gray-50 rounded-md shadow-sm 
                         border border-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
          <MatchList matches={matches} loading={loading} />
        </>
      )}
    </div>
  );
}