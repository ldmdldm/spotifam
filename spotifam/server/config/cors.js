export const corsOptions = {
  origin: ['http://localhost:5173', 'https://spotifam-music-matcher.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 204,
};