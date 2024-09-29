import { useState } from "react";
import images from "../../asset/images";
import Breadcrumb from "../../components/Breadcrumb";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import ProductFilterSideBar from "./ProductFilterSideBar";
import ProductFilterTopBar from "./ProductFIlterTopBar";
import { PAGE_TITLE, PATH } from "../../constants/path";
import { Form, Formik } from "formik";

function Products() {
  const breadcrumbItems = [
    { label: PAGE_TITLE.HOME, to: PATH.HOME },
    { label: PAGE_TITLE.PRODUCT, to: PATH.PRODUCTS },
  ];

  const items = [
    {
      id: 1,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1300000,
      image: images.popularDish1,
      rating: 2.5,
      alt: "Banner 1",
      state: 0,
      brand: "Kinh đô",
      discount: 10,
    },
    {
      id: 2,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1500000,
      image: images.popularDish2,
      rating: 5,
      alt: "Banner 2",
      state: 1,
      brand: "Huỳnh đô",
      discount: 15,
    },
    {
      id: 3,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1200000,
      image: images.popularDish3,
      rating: 4,
      alt: "Banner 3",
      state: 0,
      brand: "Sao vàng",
      discount: 20,
    },
    {
      id: 4,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1400000,
      image: images.popularDish1,
      rating: 5,
      alt: "Banner 4",
      state: 1,
      brand: "Thủ đô",
      discount: 5,
    },
    {
      id: 5,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1100000,
      image: images.popularDish3,
      rating: 3,
      alt: "Banner 5",
      state: 0,
      brand: "Sao vàng",
      discount: 25,
    },
    {
      id: 6,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: 1600000,
      image: images.popularDish2,
      rating: 4.5,
      alt: "Banner 6",
      state: 1,
      brand: "Thủ đô",
      discount: 0,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const brandList = [
    { name: "Kinh Đô", code: "kinh_do" },
    { name: "Bibica", code: "bibica" },
    { name: "Như Lan", code: "nhu_lan" },
    { name: "Hữu Nghị", code: "huu_nghi" },
    { name: "Đồng Khánh", code: "dong_khanh" },
    { name: "Brodard", code: "brodard" },
    { name: "Givral", code: "givral" },
    { name: "Maison", code: "maison" },
  ];

  const categoryList = [
    { label: "Bánh trăng vàng cao cấp", image: images.popularDish2 },
    { label: "Bánh nướng 2 trứng đb", image: images.popularDish1 },
    { label: "Bánh xanh", image: images.popularDish3 },
    { label: "Bánh trung thu OREO", image: images.childrenBanner1 },
    { label: "Bánh nướng 1 trứng", image: images.home1 },
    { label: "Bánh dẻo", image: images.home2 },
    { label: "Bánh Lava trứng chảy", image: images.popularDish4 },
    { label: "Hộp thu Young", image: images.popularDish3 },
  ];

  const initialValues = {
    rating: 1,
    displayOption: "newest",
    maxPrice: "",
    minPrice: "",
    displayOptions: {},
    price: {},
    search: "",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${images.productPageBg})`,
      }}
    >
      <Breadcrumb items={breadcrumbItems} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log("products values", values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="container py-14">
              <div className="grid grid-cols-12 gap-4">
                {/* Phần lọc sản phẩm chiếm 3 cột */}
                <div className="col-span-3 xl:block hidden">
                  <ProductFilterSideBar
                    values={values}
                    setFieldValue={setFieldValue}
                    brandList={brandList}
                    categoryList={categoryList}
                  />
                </div>

                {/* Phần hiển thị sản phẩm chiếm 9 cột */}
                <div className="xl:col-span-9 col-span-full">
                  <ProductFilterTopBar
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  {/* Danh sách sản phẩm */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <ItemCard key={item.id} product={item} />
                    ))}
                  </div>

                  <Pagination
                    pageCount={20}
                    onPageChange={handlePageChange}
                    forcePage={currentPage}
                    className="ml-auto mt-10"
                  />
                </div>

                <div className="col-span-full xl:hidden block">
                  <ProductFilterSideBar
                    values={values}
                    setFieldValue={setFieldValue}
                    brandList={brandList}
                    categoryList={categoryList}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Products;
