# 🩺 MediPulse
<br />

## 1. 소개
> MediPulse는 실시간 심박수 모니터링과 의료진용 기록 열람을 위한 IoT 기반 건강 모니터링 시스템입니다. <br />
> MAX30102 센서를 이용해 환자의 심박 데이터를 수집하고,   <br />
>React + Node.js + MySQL 기반으로 실시간 시각화 및 기록 저장 기능을 제공합니다 <br />

<br /> 

- 의료진 페이지 <br />  <br />
![1](https://github.com/user-attachments/assets/4986c642-6726-4ddd-9257-e5c436c26bf4)  <br />  <br />
![2](https://github.com/user-attachments/assets/72212c50-b6b8-421f-814c-bd89b62aa376) <br />


 
- 실시간 모니터  <br />  <br />
![3](https://github.com/user-attachments/assets/99946337-239d-4439-ba42-fbfa2c477726) <br />

<br /> 

### 작업기간
2025/05, 1주
<br /><br />

### 인력구성
1인
<br /><br /><br />

## 2. 기술스택

<img src="https://img.shields.io/badge/arduino-00878F?style=for-the-badge&logo=Arduino&logoColor=white">  <img src="https://img.shields.io/badge/c++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">   <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">  <br /><br /> <br />


## 3. 기능 
- 심박수 실시간 측정 (MAX30102 + Arduino)
- 실시간 Socket.IO 전송
- 시간별 자동 저장 + 수동 저장 기능
- 의료진용 테이블 + 그래프 UI 제공
<br /><br />

### 통신 흐름
```
[Arduino] --(Serial)--> [Node.js Server] --(Socket.IO)--> [React Client]
                                   └──> [MySQL 저장]
```
<br />

## 4. 📂 Project Structure (폴더 구조)
```
MediPulse/
├── arduino/               #  PlatformIO 기반 펌웨어 코드
│   ├── src/
│   │   └── main.cpp
│   └── platformio.ini

├── server/                #  Node.js 백엔드
│   ├── db/
│   │   ├── connection.js     ← DB 연결 풀
│   │   ├── bpmLogger.js      ← BPM 저장/조회 함수
│   │   └── schema.sql        ← 초기 테이블 생성 SQL
│   ├── routes/
│   │   ├── bpm.js            ← BPM 관련 API
│   │   └── patients.js       ← 환자 관련 API
│   ├── index.js              ← 서버 entry point
│   ├── server.js             ← Express + Socket.IO 설정
│   ├── serialHandler.js      ← 시리얼 포트 처리
│   ├── socketHandler.js      ← Socket.IO 이벤트 정의
│   └── package.json          ← 백엔드 종속성 관리

├── client/                #  React 프론트엔드
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── pages/
│   │   │   ├── MonitorPage.tsx   ← 실시간 모니터링 화면
│   │   │   ├── Manage.tsx        ← 의료진용
│   │   ├── components/
│   │   │   ├── Chart.tsx
│   │   │   └── Table.tsx

```
<br /><br />

## 5. 앞으로 학습할 것들, 나아갈 방향
- SpO2 측정
- 알림 및 경고 시스템 
- 데이터 필터링 및 검색 기능
- 다중 환자 동시 모니터링 대시보드
  
<br /><br /> <br /> 
