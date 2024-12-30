import { Link } from "@inertiajs/react";

function TableContainer({ table, img, link }) {
  return (
    <div className="table-container !rounded-none sm:!rounded-[20px]">
      <img src={img} alt="YAJI Corp Logo" className="placeholder-table" />
      <Link href={link} className="view-table-link">
        <button className="view-button">View {table}</button>
      </Link>
    </div>
  );
}

export default TableContainer;
