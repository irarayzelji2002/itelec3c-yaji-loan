function TableContainer({ table }) {
  return (
    <div className="table-container">
      <img src="/img/building.png" alt="YAJI Corp Logo" className="placeholder-table" />
      <button className="view-button">{table}</button>
    </div>
  );
}

export default TableContainer;
