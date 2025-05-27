// import React, { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import Table from '../components/Table';

// const socket: Socket = io('http://localhost:3000');

// const StaffPage: React.FC = () => {
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
//       <h2>의료진 페이지 (테이블)</h2>
//       <Table bpmData={bpmData} />
//     </div>
//   );
// };

// export default StaffPage;

//환자여러명
// import React, { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import BPMChart from '../components/Chart';
// import Table from '../components/Table';

// const socket: Socket = io('http://localhost:3000');

// const StaffPage: React.FC = () => {
//   const [bpmDataMap, setBpmDataMap] = useState<{ [key: string]: { time: number; bpm: number }[] }>({});
//   const [startTime] = useState(Date.now());

//   useEffect(() => {
//     socket.on('bpm', ({ patientId, bpm }) => {
//       setBpmDataMap(prev => ({
//         ...prev,
//         [patientId]: [...(prev[patientId] || []), { time: Date.now(), bpm }],
//       }));
//     });

//     // 테스트 환자 B용 가상 데이터
//     const interval = setInterval(() => {
//       const fakeBpm = Math.floor(Math.random() * 40) + 60;
//       setBpmDataMap(prev => ({
//         ...prev,
//         B: [...(prev['B'] || []), { time: Date.now(), bpm: fakeBpm }],
//       }));
//     }, 1000);

//     return () => {
//       socket.off('bpm');
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div>
//       <h2>의료진용 대시보드</h2>
//       <div style={{ display: 'flex', gap: '2rem' }}>
//         <div style={{ flex: 1 }}>
//           <h3>환자 A</h3>
//           <BPMChart bpmData={bpmDataMap['A'] || []} startTime={startTime} />
//           <Table bpmData={bpmDataMap['A'] || []} />
//           <h3>환자 B</h3>
//           <BPMChart bpmData={bpmDataMap['B'] || []} startTime={startTime} />
//           <Table bpmData={bpmDataMap['B'] || []} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffPage;

//환자별
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { io, Socket } from 'socket.io-client';
// import Table from '../components/Table';
// import Chart from '../components/Chart';

// const socket: Socket = io('http://localhost:3000');

// const StaffPage: React.FC = () => {
//   const { patientId } = useParams<{ patientId: string }>();// 환자 ID
//   const [bpmData, setBpmData] = useState<{ time: string; bpm: number }[]>([]);
//   const [lastSavedTime, setLastSavedTime] = useState<number | null>(null);

//   useEffect(() => {
//     const handler = (bpm: number) => {
//       const now = Date.now();

//       if (lastSavedTime === null || now - lastSavedTime >= 60* 60 * 1000) {
//         setBpmData(prev => [
//           ...prev,
//           {
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         bpm
//           },
//         ]);
//         setLastSavedTime(now);
//       }
//     };

//     socket.on(`bpm:${patientId}`, handler);

//     return () => {
//       socket.off(`bpm:${patientId}`, handler);
//     };
//   }, [patientId, lastSavedTime]);

//   return (
//   <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <h2>의료진 페이지 - 환자 {patientId}</h2>

//       {/* Chart: 2/3 높이 */}
//       <div style={{ flex: 1, padding: '10px' }}>
//         <Chart bpmData={bpmData} showTimeAxis={true} />
//       </div>

//       {/* Table: 1/3 높이 */}
//       <div style={{ flex: 1, minHeight: '250px', flexShrink: 0, overflowY: 'auto' }}>
//   <Table bpmData={bpmData} />
//       </div>
//     </div>
//   );
// };

// export default StaffPage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import Table from '../components/Table';
import Chart from '../components/Chart';

interface StaffPageProps {
  patientId: string;
  bpmData: { time: string; bpm: number }[];
}
const socket: Socket = io('http://localhost:3000');
// const StaffPage: React.FC<StaffPageProps> = ({ patientId, bpmData }) => {
  

 const StaffPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();// 환자 ID
  const [bpmData, setBpmData] = useState<{ time: string; bpm: number }[]>([]);
  const [lastSavedTime, setLastSavedTime] = useState<number | null>(null);

  useEffect(() => {
    const handler = (bpm: number) => {
      const now = Date.now();

      if (lastSavedTime === null || now - lastSavedTime >= 60* 60 * 1000) {
        setBpmData(prev => [
          ...prev,
          {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bpm
          },
        ]);
        setLastSavedTime(now);
      }
    };

    socket.on(`bpm:${patientId}`, handler);

    return () => {
      socket.off(`bpm:${patientId}`, handler);
    };
  }, [patientId, lastSavedTime]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Noto Sans, sans-serif',
        backgroundColor: '#f3f4f6',
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          backgroundColor: '#1f2937',
          color: '#fff',
          padding: '16px 24px',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          borderBottom: '2px solid #374151',
        }}
      >
       의료진 페이지 - 환자 {patientId}
      </header>

      {/* 그래프 섹션 */}
      <section
        style={{
          flex: 1.5,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            height: '100%',
          }}
        >
          <Chart bpmData={bpmData} showTimeAxis={true} />
        </div>
      </section>

      {/* 테이블 섹션 */}
      <section
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f9fafb',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            height: '100%',
          }}
        >
          <Table bpmData={bpmData} />
        </div>
      </section>
    </div>
  );
};

export default StaffPage;
