//실제 아두이노 데이터 연동용
// const { SerialPort } = require('serialport');
// const { ReadlineParser } = require('@serialport/parser-readline');
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const portName = 'COM3';  // 실제 연결된 포트로 수정

// // ✅ SerialPort 생성 방식 수정
// const serialPort = new SerialPort({ path: portName, baudRate: 115200 });

// // ✅ ReadlineParser로 파서 설정
// const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// serialPort.on('open', () => {
//   console.log(`Serial port ${portName} opened`);
// });



// parser.on('data', (line) => {
//   // 아두이노 출력 예: "IR=123456, BPM=78.00, Avg BPM=76"
//   console.log('Serial data:', line.trim());

//   // 여기서 BPM만 추출 (간단히 정규식 사용)
//    const match = line.match(/BPM=(\d+(\.\d+)?)/);
//   if (match) {
//     const bpm = parseFloat(match[1]);
//     io.emit('bpm', bpm);
//   }
// });

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// })

// //serialport 패키지랑 socket.io, express 설치 필요
// //npm install serialport @serialport/parser-readline express socket.io 




// //Socket.io + Serial + BPM 필터링
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const { SerialPort } = require('serialport');
// const { ReadlineParser } = require('@serialport/parser-readline');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // 아두이노 연결 포트 (필요시 COM 포트 확인 후 수정)
// const portName = 'COM3';
// const serialPort = new SerialPort({ path: portName, baudRate: 115200 });

// // 시리얼 데이터 파서
// const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// // 시리얼 포트 연결 확인
// serialPort.on('open', () => {
//   console.log(`✅ Serial port ${portName} opened`);
// });

// // 시리얼 데이터 수신
// parser.on('data', (line) => {
//   //아두이노 연결시
//   // const trimmed = line.trim();
//   // console.log(`📡 Received: ${trimmed}`);

//   // // BPM=숫자 만 추출해서 전송
//   // const match = trimmed.match(/BPM=(\d+(\.\d+)?)/);
//   // if (match) {
//   //   const bpmValue = parseFloat(match[1]);
//   //   console.log(`🎯 Sending BPM: ${bpmValue}`);
//   //   io.emit('bpm', bpmValue); // 웹 클라이언트로 전송
//   // }

//   //아두이노 연결X
//     setInterval(() => {
//     const fakeBPM = Math.floor(Math.random() * 40) + 60;
//     console.log(`💡 Fake BPM: ${fakeBPM}`);
//     io.emit('bpm', fakeBPM);
//   }, 1000);
// });

// // 웹 서버 라우팅
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // 소켓 연결 확인
// io.on('connection', (socket) => {
//   console.log('📲 A client connected');
// });

// // 서버 실행
// server.listen(3000, () => {
//   console.log('🌐 Server running on http://localhost:3000');
// });


//서버 실행 진입점
//환자별 
// CommonJS 방식
// const { createServer } = require('./server');
// const { setupSerial } = require('./serialHandler');
// const { registerSocketEvents } = require('./socketHandler');

// const { server, io } = createServer();  // Express + Socket.IO 서버 생성

// // 소켓 연결 시 이벤트 등록
// io.on('connection', (socket) => {
//   registerSocketEvents(socket, io);
// });

// setupSerial(io); // 시리얼 포트 연결 시작


// const { server, io } = createServer();   // 구조분해 할당으로 io도 받아옴
// setupSerial(io);                          // io를 전달해줌


//ESM 방식
import { createServer } from './server.js';
import { setupSerial } from './serialHandler.js';
import { registerSocketEvents } from './socketHandler.js';

const { server, io } = createServer();  // Express + Socket.IO 서버 생성

// 소켓 연결 시 이벤트 등록
io.on('connection', (socket) => {
  registerSocketEvents(socket, io);
});

setupSerial(io); // 시리얼 포트 연결 시작