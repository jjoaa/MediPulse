//클라이언트별 소켓 로직
//환자별

export function registerSocketEvents(socket) {
  // 향후: 클라이언트가 특정 환자 구독 등 구현 가능
  console.log(` Client ${socket.id} is ready`);
}




//환자별 + DB
// const { saveHourlyBPM } = require('./db/bpmLogger');

// function registerSocketEvents(socket, io) {
//   console.log(`🧩 Client ${socket.id} is ready`);

//   // 환자별 BPM 수신
//   socket.on('bpm', ({ patientId, bpm }) => {
//     console.log(`📡 BPM 수신: ${patientId} - ${bpm}`);

//     // 브로드캐스트
//     io.emit(`bpm:${patientId}`, bpm);

//     // 1시간 단위로 저장
//     const now = new Date();
//     if (now.getMinutes() === 0 && now.getSeconds() < 2) {
//       saveHourlyBPM(patientId, bpm).catch(console.error);
//     }
//   });
// }

// module.exports = { registerSocketEvents };
