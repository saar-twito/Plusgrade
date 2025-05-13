import type { Reservation } from '../types';

interface Props {
  uuid: string;
  reservation: Reservation;
  expanded: boolean;
  onToggle: () => void;
}

const ReservationRow = ({ uuid, reservation, expanded, onToggle }: Props) => {
  const { hasCancelled, count, total, items } = reservation;

  const getRowClass = (status: string) => {
    if (status === 'active') return 'row-active';
    if (status === 'cancelled') return 'row-cancelled';
    return 'row-offered';
  };

  return (
    <>
      <tr
        className={hasCancelled ? 'row-cancelled' : ''}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
      >
        <td><strong>{uuid}</strong></td>
        <td>{count}</td>
        <td>{total}</td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={3} style={{ padding: 0 }}>
            <table className="nested-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Charge</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className={getRowClass(item.status)}>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                    <td>{item.charge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default ReservationRow;
