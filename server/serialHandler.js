//아두이노 시리얼 데이터 수신
//환자별
//Common SJ
// const { SerialPort } = require('serialport');
// const { ReadlineParser } = require('@serialport/parser-readline');

// function setupSerial(io) {
//   const portName = 'COM3';
//   const serialPort = new SerialPort({ path: portName, baudRate: 115200 });
//   const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

//   serialPort.on('open', () => {
//     console.log(`✅ Serial port ${portName} opened`);
//   });

//   //환자 A (실제 아두이노) 데이터 수신 처리
//   parser.on('data', (line) => {
//     const match = line.match(/BPM=(\d+)/);
//     if (match) {
//       const bpm = parseInt(match[1]);
//       console.log(`📡 Received from Arduino: ${bpm}`);
//       io.emit('bpm:patientA', bpm);
//     }
//   });


//   // 환자 B (더미) 주기적 전송
//   setInterval(() => {
//     const dummyBpm = Math.floor(Math.random() * 40) + 60; // 60~99
//     console.log(`📤 Sending dummy BPM for patient B: ${dummyBpm}`);
//     io.emit('bpm:patientB', dummyBpm);
//   }, 1000);

//     // 환자 B (더미) 주기적 전송
//   setInterval(() => {
//     const dummyBpm1 = Math.floor(Math.random() * 40) + 40; // 40~80
//     console.log(`📤 Sending dummy BPM for patient A: ${dummyBpm1}`);
//     io.emit('bpm:patientA', dummyBpm1);
//   }, 1000);
// }

// module.exports = { setupSerial };


//ESM 방식
import { SerialPort } from 'serialport'; 
import { ReadlineParser } from '@serialport/parser-readline'; 
import { saveHourlyBPM } from './db/bpmLogger.js'; // DB저장

export function setupSerial(io) { 
  const portName = 'COM3';
  const serialPort = new SerialPort({ path: portName, baudRate: 115200 });
  const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  serialPort.on('open', () => {
    console.log(` Serial port ${portName} opened`);
  });

  //환자 A (실제 아두이노) 데이터 수신 처리
parser.on('data', async (line) => {
  const match = line.match(/BPM=(\d+)/);
  if (match) {
    const bpm = parseInt(match[1]);
    //console.log(`Received from Arduino: ${bpm}`);
    io.emit('bpm:patientA', bpm);

    try {
      await saveHourlyBPM('patientA', bpm);
      //console.log('✅ patientA BPM 저장됨');
    } catch (err) {
      console.error('❌ patientA DB 저장 실패:', err);
    }
  }
});

  // 환자 B (더미) 주기적 전송
  setInterval(async () => {
  const dummyBpm = Math.floor(Math.random() * 40) + 60; // 60~99
  //console.log(`Sending dummy BPM for patient B: ${dummyBpm}`);
  io.emit('bpm:patientB', dummyBpm);

  try {
    await saveHourlyBPM('patientB', dummyBpm);
    //console.log('✅ patientB BPM 저장됨');
  } catch (err) {
    console.error('❌ patientB DB 저장 실패:', err);
  }
}, 1000);

}
