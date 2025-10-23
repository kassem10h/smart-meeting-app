export default function AutoTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <div className="card">No data.</div>;
  }
  const columns = Array.from(new Set(rows.flatMap(r => Object.keys(r))));
  return (
    <div className="card">
      <div style={{overflowX:'auto'}}>
        <table className="table">
          <thead>
            <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {columns.map(c => (
                  <td key={c + i}>
                    {typeof r[c] === 'object' ? JSON.stringify(r[c]) : String(r[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
