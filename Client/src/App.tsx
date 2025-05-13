import { useEffect, useState } from 'react';
import './App.css';
import ReservationRow from './components/ReservationRow';
import type { Reservation } from './types';

function App() {
  const [data, setData] = useState<Record<string, Reservation>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Function to toggle the expanded state of a reservation row
  // So the UUID represents the unique identifier for each reservation
  const toggle = (uuid: string) => {
    setExpanded(prev => ({ ...prev, [uuid]: !prev[uuid] }));
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/reservations')
      .then((res) => res.json())
      .then(setData);
  }, []);

  // I'm Creating the rows using for...in loop to iterate over the keys of the data object
  const rows = [];
  for (const uuid in data) {
    rows.push(
      <ReservationRow
        key={uuid}
        uuid={uuid}
        reservation={data[uuid]}
        expanded={expanded[uuid] === true}
        onToggle={() => toggle(uuid)}
      />
    );
  }

  return (
    <div className="App">
      <h1>Reservation Summary</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Reservation UUID</th>
            <th>Number of Active Purchases</th>
            <th>Sum of Active Charges</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default App;