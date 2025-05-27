//BPM 저장/조회 관련 함수들

import pool from './connection.js';

// 자동 저장 (1시간 단위)
export async function saveHourlyBPM(patientId, bp) {
  const now = new Date();
  const logDate = now.toISOString().slice(0, 10); // yyyy-mm-dd
  const logTime = `${now.getHours().toString().padStart(2, '0')}:00:00`; // HH:00:00

  await pool.execute(
    `INSERT INTO patient_bp (patient_id, log_date, log_time, bp)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE bp = ?`,
    [patientId, logDate, logTime, bp, bp]
  );
}

// 수동 저장
export async function saveManualBPM(patientId, bp, dateStr, timeStr) {
    console.log("수동 저장 파라미터:", { patientId, bp, dateStr, timeStr });
  await pool.execute(
    `INSERT INTO patient_bp (patient_id, log_date, log_time, bp)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE bp = ?`,
    [patientId, dateStr, timeStr, bp, bp]
  );
  console.log("수동 저장 완료");
}

//의료진 페이지에서 기록 불러오기용
export async function getBPMLogs(patientId, dateStr) {
  const [rows] = await pool.execute(
    `SELECT log_time, bp
     FROM patient_bp
     WHERE patient_id = ? AND log_date = ?
     ORDER BY log_time`,
    [patientId, dateStr]
  );
  return rows;
}