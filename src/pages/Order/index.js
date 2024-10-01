import { useState } from "react";
import Pagination from "../../components/Pagination";

function Order() {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">
        Danh sách đơn hàng của bạn
      </h2>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"></div>

      {/* <Pagination
        pageCount={20}
        onPageChange={handlePageChange}
        forcePage={currentPage}
        className="ml-auto mt-10"
      /> */}
    </div>
  );
}

export default Order;
