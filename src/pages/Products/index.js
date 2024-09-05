import images from "../../asset/images";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import ProductFilterSideBar from "./ProductFilterSideBar";
import ProductFilterTopBar from "./ProductFIlterTopBar";

function Products() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
  ];

  const items = [
    {
      id: 1,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish1,
      rating: 2.5,
      alt: "Banner 1",
    },
    {
      id: 2,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish2,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 3,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish3,
      rating: 4,
      alt: "Banner 1",
    },
    {
      id: 4,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 5,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 6,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 1,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish1,
      rating: 2.5,
      alt: "Banner 1",
    },
    {
      id: 2,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish2,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 3,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish3,
      rating: 4,
      alt: "Banner 1",
    },
    {
      id: 4,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 5,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 6,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
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

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
