import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import Table from '../components/Table';

const Manage: React.FC = () => {
  const [patientList, setPatientList] = useState<string[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date().toISOString().slice(0, 10);
    return today;
  });
  const [bpmData, setBpmData] = useState<{ time: string; bpm: number }[]>([]);

  const [manualTime, setManualTime] = useState('');
  const [manualBpm, setManualBpm] = useState('');


  // 환자 리스트 불러오기
  useEffect(() => {
    axios.get('/api/patients')  // 예: /api/patients → ["patientA", "patientB"]
      .then(res => {
         console.log('API /api/patients 응답:', res.data);
          setPatientList(res.data)
      })
      .catch(err => console.error('Failed to load patient list', err));
  }, []);

  // 환자 & 날짜 변경 시 데이터 불러오기
  useEffect(() => {
    if (!selectedPatient) return;
    axios.get(`/api/bpm/${selectedPatient}/${selectedDate}`)
      .then(res => { 
        const transformed = res.data.map((item: any) => ({
          time: item.log_time.slice(0, 5), 
           bpm: item.bp,
    }));
    setBpmData(transformed);
    console.log('📊 Transformed BPM Data:', transformed); // ✅ 위치 옮김
  }).catch(err => console.error('Failed to load BPM data', err));
  }, [selectedPatient, selectedDate]);

 const handleManualAdd = async () => {
              if (!manualTime || !manualBpm) return alert('시간과 BPM을 입력하세요.');

              console.log("1",selectedPatient,manualBpm,selectedDate,manualTime);

              try {
                await axios.post('/api/bpm/manual', {
                  patientId: selectedPatient,
                  bpm: parseInt(manualBpm),
                  date: selectedDate, // yyyy-mm-dd 형식
                  time: manualTime     // "HH:mm" 형식
                });

                console.log(selectedPatient,manualBpm,selectedDate,manualTime);
                // 화면에도 즉시 반영
                setBpmData(prev => [
                  ...prev,
                  { time: manualTime, bpm: parseInt(manualBpm) },
                ]);

                setManualTime('');
                setManualBpm('');
              } catch (err) {
                console.error('수동 저장 실패:', err);
                alert('수동 저장에 실패했습니다.');
              }
            }
  return (
    
    // <div style={{ display: 'flex', height: '100vh' }}>
    //   {/* 왼쪽 환자 목록 */}
    //   <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
    //     <h3>환자 목록</h3>
    //     <ul style={{ listStyle: 'none', padding: 0 }}>
    //       {patientList.map(id => (
    //         <li key={id} style={{ cursor: 'pointer', marginBottom: '8px', fontWeight: id === selectedPatient ? 'bold' : 'normal' }}
    //             onClick={() => setSelectedPatient(id)}>
    //           {id}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    //   {/* 오른쪽 컨텐츠 */}
    //   <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    //     {/* 상단 바 */}
    //     <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
    //       <h2>의료진 페이지 - {selectedPatient ?? '환자 선택'}</h2>
    //       <input
    //         type="date"
    //         value={selectedDate}
    //         onChange={(e) => setSelectedDate(e.target.value)}
    //       />
    //     </div>

    //     {/* 그래프 */}
    //     <div style={{ flex: 2, padding: '10px' }}>
    //       <Chart bpmData={bpmData} showTimeAxis={true} />
    //     </div>

    //     {/* 테이블 */}
    //     <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
    //       <h4>수동 입력</h4>
    //       <input
    //         type="time"
    //         value={manualTime}
    //         onChange={(e) => setManualTime(e.target.value)}
    //         style={{ marginRight: '10px' }}
    //       />
    //       <input
    //         type="number"
    //         placeholder="BPM"
    //         value={manualBpm}
    //         onChange={(e) => setManualBpm(e.target.value)}
    //         style={{ marginRight: '10px', width: '80px' }}
    //       />
    //       <button
    //         onClick={async() => {
    //           if (!manualTime || !manualBpm) return alert('시간과 BPM을 입력하세요.');

    //           console.log("1",selectedPatient,manualBpm,selectedDate,manualTime);

    //           try {
    //             await axios.post('/api/bpm/manual', {
    //               patientId: selectedPatient,
    //               bpm: parseInt(manualBpm),
    //               date: selectedDate, // yyyy-mm-dd 형식
    //               time: manualTime     // "HH:mm" 형식
    //             });

    //             console.log(selectedPatient,manualBpm,selectedDate,manualTime);
    //             // 화면에도 즉시 반영
    //             setBpmData(prev => [
    //               ...prev,
    //               { time: manualTime, bpm: parseInt(manualBpm) },
    //             ]);

    //             setManualTime('');
    //             setManualBpm('');
    //           } catch (err) {
    //             console.error('수동 저장 실패:', err);
    //             alert('수동 저장에 실패했습니다.');
    //           }
    //         }}
    //       >
    //         추가
    //       </button>
    //     </div>

    //     <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
    //       <Table bpmData={bpmData} />
    //     </div>
    //   </div>
    // </div>
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', height: '100vh', fontFamily: 'Noto Sans, sans-serif' }}>
  {/* 왼쪽 환자 목록 */}
  <aside style={{ background: '#1f2937', color: '#fff', padding: '20px', borderRight: '2px solid #374151' }}>
    <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>환자 목록</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {patientList.map(id => (
        <li key={id}
            style={{
              padding: '8px 12px',
              marginBottom: '8px',
              backgroundColor: id === selectedPatient ? '#3b82f6' : 'transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: id === selectedPatient ? 'bold' : 'normal',
              transition: 'background-color 0.2s'
            }}
            onClick={() => setSelectedPatient(id)}>
          {id}
        </li>
      ))}
    </ul>
  </aside>

  {/* 오른쪽 컨텐츠 */}
  <main style={{ display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
    {/* 상단 바 */}
    <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
      <h2 style={{ marginBottom: '10px' }}>🩺 의료진 페이지 - {selectedPatient ?? '환자 선택'}</h2>
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc' }} />
    </div>

    {/* 그래프 */}
    <section style={{ flex: 2, padding: '20px' }}>
      <Chart bpmData={bpmData} showTimeAxis={true} />
    </section>

    {/* 수동 입력 */}
    <section style={{ padding: '20px', background: '#fff', borderTop: '1px solid #e5e7eb' }}>
      <h4 style={{ marginBottom: '10px' }}>수동 입력</h4>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input type="time" value={manualTime} onChange={(e) => setManualTime(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
        <input type="number" placeholder="BPM" value={manualBpm} onChange={(e) => setManualBpm(e.target.value)} style={{ padding: '8px', width: '80px', borderRadius: '6px', border: '1px solid #ccc' }} />
        <button onClick={handleManualAdd} style={{
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          ➕ 추가
        </button>
      </div>
    </section>

    {/* 테이블 */}
    <section style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
      <Table bpmData={bpmData} />
    </section>
  </main>
  </div>
  );
}

export default Manage;