import { Link } from "@inertiajs/react";

function TableContainer({ table }) {
  return (
    <div className="table-container">
      <img src="/img/building.png" alt="YAJI Corp Logo" className="placeholder-table" />
      <Link href="/table-view" className="view-table-link">
        <button className="view-button">View {table}</button>
      </Link>
    </div>
  );
}

export default TableContainer;
