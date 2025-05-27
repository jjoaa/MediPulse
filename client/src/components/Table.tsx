//import React from 'react';

// interface TableProps {
//   bpmData: number[];
// }

// const Table: React.FC<TableProps> = ({ bpmData }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>순서</th>
//           <th>BPM</th>
//         </tr>
//       </thead>
//       <tbody>
//         {bpmData.map((bpm, index) => (
//           <tr key={index}>
//             <td>{index + 1}</td>
//             <td>{bpm}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// import React from 'react';
// interface TableProps {
//   bpmData: number[];
// }

// const Table: React.FC<TableProps> = ({ bpmData }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Index</th>
//           <th>BPM</th>
//         </tr>
//       </thead>
//       <tbody>
//         {bpmData.map((bpm, index) => (
//           <tr key={index}>
//             <td>{index + 1}</td>
//             <td>{bpm}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;


//환자 여러명
import React from 'react';

const Table: React.FC<{ bpmData: { time: string; bpm: number }[] }> = ({ bpmData }) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>시간</th>
          {bpmData.map((point, idx) => (
            <th key={idx}>{point.time}</th> // ✅ 문자열 직접 출력
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BPM</td>
          {bpmData.map((point, idx) => (
            <td key={idx}>{point.bpm}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
