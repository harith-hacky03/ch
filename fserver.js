const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// CORS preflight handling
app.options('/api/upload', cors());

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', cors(), upload.single('photo'), (req, res) => {
  console.log('file', req.file); // Use req.file, not req.files
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `server is running at http://localhost:${process.env.PORT || 3000}`
  );
});
