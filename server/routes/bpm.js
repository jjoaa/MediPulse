//API 라우터 만들기
import express from 'express';
import { getBPMLogs, saveManualBPM } from '../db/bpmLogger.js';

const router = express.Router();

// 특정 날짜의 로그 조회
router.get('/:patientId/:date', async (req, res) => {
  const { patientId, date } = req.params;
  try {
    const logs = await getBPMLogs(patientId, date);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// 수동으로 저장 (예: 의료진이 직접 기록)
router.post('/manual', async (req, res) => {
  const { patientId, bpm, date, time } = req.body;

  console.log('📥 수신된 수동 입력 데이터:', req.body); // ← 여기가 먼저 찍혀야 합니다

  if (!patientId || !bpm || !date || !time) {
    console.log('❗ 빠진 필드 있음:', { patientId, bpm, date, time });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log('✅ saveManualBPM 호출 직전'); // ← 이게 찍히는지 확인
    await saveManualBPM(patientId, bpm, date, time);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ DB 저장 오류:', err);
    res.status(500).json({ error: 'Failed to save manually' });
  }
});

export default router;