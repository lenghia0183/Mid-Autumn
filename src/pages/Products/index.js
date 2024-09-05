import images from "../../asset/images";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductFilterSideBar from "./ProductFilterSideBar";
import ProductFilterTopBar from "./ProductFIlterTopBar";

function Products() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <div className="container pt-14">
        <div className="grid grid-cols-12 gap-4">
          {/* Phần lọc sản phẩm chiếm 3 cột */}
          <div className="col-span-3">
            <ProductFilterSideBar />
          </div>

          {/* Phần hiển thị sản phẩm chiếm 9 cột */}
          <div className="col-span-9">
            <ProductFilterTopBar />

            {/* Đây là nơi bạn sẽ hiển thị danh sách sản phẩm */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Ví dụ sản phẩm */}

              {/* Thêm sản phẩm khác ở đây */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Products;
