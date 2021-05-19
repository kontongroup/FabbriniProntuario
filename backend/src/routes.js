const { Router } = require('express');
const Prontuario = require('./models/Prontuario');

const routes = Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now());
  },
});

const upload = multer({
  storage: storage,
});

routes.post('/prontuario', upload.single('image'), async (req, res) => {
  const { selectedDate, selectsex, dados } = req.body;

  const pront = await Prontuario.create({
    selectedDate,
    selectsex,
    dados,
  });
  //console.log(pront);
  return res.json(pront);
});

module.exports = routes;
