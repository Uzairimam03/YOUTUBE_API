import express from 'express';
import dotenv from 'dotenv';
import videoRoutes from './routes/videoRoutes.js';
import cors from 'cors';

dotenv.config(); // 

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());  
app.use(cors({
  origin: 'http://127.0.0.1:5500' 
  
}));
// Routes
app.use('/api/videos', videoRoutes);

app.get('/config', (req, res) => {
  res.json({ port: port });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
