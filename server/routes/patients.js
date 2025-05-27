//등록된 환자 ID 목록
import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.execute('SELECT DISTINCT patient_id FROM patient_bp');
  const ids = rows.map(row => row.patient_id);
  res.json(ids);
});

export default router;