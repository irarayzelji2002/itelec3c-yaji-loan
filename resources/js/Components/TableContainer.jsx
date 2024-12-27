import { Link } from "@inertiajs/react";

function TableContainer({ table, img }) {
  return (
    <div className="table-container">
      <img src={img} alt="YAJI Corp Logo" className="placeholder-table" />
      <Link href="/table-view" className="view-table-link">
        <button className="view-button">View {table}</button>
      </Link>
    </div>
  );
}

export default TableContainer;
