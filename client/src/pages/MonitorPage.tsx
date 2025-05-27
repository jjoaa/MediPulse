// import React, { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import BPMChart from '../components/Chart';

// const socket: Socket = io('http://localhost:3000');

// const MonitorPage: React.FC = () => {
//   const [bpmData, setBpmData] = useState<number[]>([]);

//   useEffect(() => {
//     socket.on('bpm', (bpm: number) => {
//       setBpmData(prev => [...prev, bpm]);
//     });

//     return () => {
//       socket.off('bpm');
//     };
//   }, []);

//   return (
//     <div>
//       <h2>모니터 페이지 (환자용)</h2>
//       <BPMChart bpmData={bpmData} />
//     </div>
//   );
// };

// export default MonitorPage;

// 환자 여러명 
// import React, { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import BPMChart from '../components/Chart';

// const socket: Socket = io('http://localhost:3000');

// const MonitorPage: React.FC = () => {
//   const [bpmData, setBpmData] = useState<{ time: number; bpm: number }[]>([]);
//   const [startTime] = useState(Date.now());

//   useEffect(() => {
//     socket.on('bpm', ({ patientId, bpm }) => {
//       if (patientId === 'A') {
//         setBpmData(prev => [...prev, { time: Date.now(), bpm }]);
//       }
//     });
//     return () => socket.off('bpm');
//   }, []);

//   return (
//     <div>
//       <h2>환자용 모니터링 페이지</h2>
//       <BPMChart bpmData={bpmData} startTime={startTime} />
//     </div>
//   );
// };

// export default MonitorPage;

//환자별 
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import Chart from '../components/Chart';

// const socket: Socket = io('http://localhost:3000');

// const MonitorPage: React.FC = () => {
//   const { id } = useParams();
//   const [bpmData, setBpmData] = useState<{ time: number; value: number }[]>([]);
//   const [currentBpm, setCurrentBpm] = useState<number | null>(null);
//   const [baseTime, setBaseTime] = useState<number>(Date.now()); // 기준 시간

//   useEffect(() => {
//     const handler = (bpm: number) => {
//       const now = Date.now();

//       setCurrentBpm(bpm);

//       if (now - baseTime >= 30 * 1000) {
//         // 30초 지나면 새로 시작
//         setBaseTime(now);
//         setBpmData([{ time: now, value: bpm }]);
//       } else {
//         setBpmData(prev => [...prev, { time: now, value: bpm }]);
//       }
//     };

//     socket.on(`bpm:${id}`, handler);
//     return () => {
//       socket.off(`bpm:${id}`, handler);
//     };
//   }, [id, baseTime]); // baseTime을 의존성에 포함

//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
//       {/* 실시간 BPM 수치 표시 */}
//       <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
//         {id} 환자 BPM: {currentBpm ?? ''}
//       </div>

//       {/* 실시간 차트 */}
//        <div style={{ width: '90%' }}>
//         <Chart bpmData={bpmData} showTimeAxis={false} />
//       </div>
//     </div>
//   );
// };

// export default MonitorPage;

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Chart from '../components/Chart';
import Table from '../components/Table';

const socket: Socket = io('http://localhost:3000');

function formatTime(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // "HH:mm:ss" 형식
}

const MonitorPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [bpmData, setBpmData] = useState<{ time: string; bpm: number }[]>([]);
  const [currentBpm, setCurrentBpm] = useState<number | null>(null);
  const baseTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!patientId) return;

    const handler = (bpm: number) => {
      const now = Date.now();

      setCurrentBpm(bpm);

      if (now - baseTimeRef.current >= 30 * 1000) {
        baseTimeRef.current = now;
        setBpmData([{ time: formatTime(now), bpm }]);
      } else {
        setBpmData(prev => [...prev, { time: formatTime(now), bpm }]);
      }
    };

    socket.on(`bpm:${patientId}`, handler);

    return () => {
      socket.off(`bpm:${patientId}`, handler);
    };
  }, [patientId]);  // baseTime은 의존성에서 제거

  return (
    <div
  style={{
    padding: 20,
    height: '100vh',
    backgroundColor: '#111827', // 다크 배경
    color: '#f9fafb', // 텍스트 밝게
    fontFamily: 'Noto Sans, sans-serif',
  }}
>
  {/* 헤더 (밝은 배경) */}
  <div
    style={{
      backgroundColor: '#ffffff',
      color: '#111827',
      padding: '16px 20px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
  >
    {patientId} 환자 실시간 모니터링
  </div>

  <div style={{ fontSize: 30, marginBottom: 16 }}>
    Pulse : {currentBpm ?? '수신 대기 중...'}
  </div>

  <div style={{ display: 'flex', gap: 40 }}>
    {/* 그래프 카드 */}
    <div
      style={{
        flex: 1,
        backgroundColor: '#000000',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 6px rgba(255,255,255,0.05)',
      }}
    >
      <Chart bpmData={bpmData} showTimeAxis={false} />
    </div>
  </div>
</div>
  );
};

export default MonitorPage;