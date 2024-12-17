export const SPOTIFY_CONFIG = {
  CLIENT_ID: '5c733fd1e96249d3bce133b5651976c9',
  REDIRECT_URI: 'https://spotifam.vercel.app/callback',
  SCOPES: [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'playlist-read-private',
    'user-top-read'
  ].join(' ')
};