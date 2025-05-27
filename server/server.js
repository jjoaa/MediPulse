//아두이노 연결 전에 데이터 흐름이나 socket 통신 연습용
// const SerialPort = require("serialport");
// const Readline = require("@serialport/parser-readline");
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// //const port = new SerialPort("COM5", { baudRate: 9600 }); // 아두이노 포트
// const parser = port.pipe(new Readline({ delimiter: "\n" }));

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// parser.on("data", (data) => {
//   const bpm = parseInt(data.trim(), 10);
//   //console.log("BPM:", bpm);
//   io.emit("bpm", bpm); // 클라이언트로 전송
// });

// server.listen(3001, () => console.log("Server running on port 3001"));


//(Express + Socket.IO 설정)
//환자별
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const { registerSocketEvents } = require('./socketHandler');

// function createServer() {
//   const app = express();
//   const server = http.createServer(app);
//   const io = new Server(server, {
//     cors: {
//       origin: '*',
//     }
//   });

//   // 웹 기본 라우팅
//   app.get('/', (req, res) => {
//     res.send('Server is running.');
//   });

//   // 소켓 연결 이벤트 핸들링
//   io.on('connection', (socket) => {
//     console.log('📲 A client connected:', socket.id);
//     registerSocketEvents(socket);
//   });

//   // 서버 시작
//   const PORT = 3000;
//   server.listen(PORT, () => {
//     console.log(`🌐 Server running on http://localhost:${PORT}`);
//   });

//   return { app, server, io };
// }

// module.exports = { createServer };


//DB 추가 CommonJS
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const { registerSocketEvents } = require('./socketHandler');
// const bpmRouter = require('./routes/bpm'); // REST API 라우터 가져오기

// function createServer() {
//   const app = express();
//   const server = http.createServer(app);
//   const io = new Server(server, {
//     cors: {
//       origin: '*',
//     }
//   });

//   app.use(express.json()); // POST 요청 처리용
//   app.use('/api/bpm', bpmRouter); // REST API 라우터 등록

//   app.get('/', (req, res) => {
//     res.send('Server is running.');
//   });

//   io.on('connection', (socket) => {
//     console.log('📲 A client connected:', socket.id);
//     registerSocketEvents(socket);
//   });

//   const PORT = 3000;
//   server.listen(PORT, () => {
//     console.log(`🌐 Server running on http://localhost:${PORT}`);
//   });

//   return { app, server, io };
// }

// module.exports = { createServer };

//ESM 방식 
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { registerSocketEvents } from './socketHandler.js';  // ← 확장자 추가
import bpmRouter from './routes/bpm.js';                     // ← ESM 방식 import
import patientRouter from './routes/patients.js'; //  환자 목록 API 추가

function createServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  app.use(express.json()); // POST 요청 처리용
  app.use('/api/bpm', bpmRouter); // REST API 라우터 등록
    app.use('/api/patients', patientRouter); //

  app.get('/', (req, res) => {
    res.send('Server is running.');
  });

  io.on('connection', (socket) => {
    console.log('📲 A client connected:', socket.id);
    registerSocketEvents(socket, io); // io도 전달
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
  });

  return { app, server, io };
}

export { createServer };
