-- 초기 테이블 생성 SQL

CREATE TABLE IF NOT EXISTS patient_bp (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id VARCHAR(50) NOT NULL,
  log_date DATE NOT NULL,
  log_time TIME NOT NULL,
  bp INT NOT NULL,
  UNIQUE KEY unique_log (patient_id, log_date, log_time)
);
