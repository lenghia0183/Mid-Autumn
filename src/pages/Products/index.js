import { useState } from "react";
import images from "../../asset/images";
import Breadcrumb from "../../components/Breadcrumb";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import ProductFilterSideBar from "./ProductFilterSideBar";
import ProductFilterTopBar from "./ProductFIlterTopBar";
import { PAGE_TITLE, PATH } from "../../constants/path";
import { Form, Formik } from "formik";
import { useQueryState } from "../../hooks/useQueryState";
import useBreakpoint from "./../../hooks/useBreakpoint";
import { useGetManufacturer, useGetProduct } from "../../service/https";
import Backdrop from "../../components/BackDrop";
import { useGetCategory } from "../../service/https/category";

function Products() {
  const breadcrumbItems = [
    { label: PAGE_TITLE.HOME, to: PATH.HOME },
    { label: PAGE_TITLE.PRODUCT, to: PATH.PRODUCTS },
  ];

  const { filters, setFilters } = useQueryState({
    filters: {
      rating: 1,
      displayOption: "newest",
      maxPrice: "",
      minPrice: "",
      displayOptions: {},
      price: {},
      search: "",
    },
  });

  const { data, isLoading, mutate: refreshGetProduct } = useGetProduct();
  const { data: manufacturerList, isLoading: isGetManufacturerLoading } =
    useGetManufacturer();
  const { data: categoryList, isLoading: isGetCategoryLoading } =
    useGetCategory();

  console.log("items", data);
  console.log("manufacturerList", manufacturerList);
  console.log("categoryList", categoryList);

  const isLargerThanSm = useBreakpoint("sm");

  // const [currentPage, setCurrentPage] = useState(0);

  // const categoryList = [
  //   { label: "Bánh trăng vàng cao cấp", image: images.popularDish2 },
  //   { label: "Bánh nướng 2 trứng đb", image: images.popularDish1 },
  //   { label: "Bánh xanh", image: images.popularDish3 },
  //   { label: "Bánh trung thu OREO", image: images.childrenBanner1 },
  //   { label: "Bánh nướng 1 trứng", image: images.home1 },
  //   { label: "Bánh dẻo", image: images.home2 },
  //   { label: "Bánh Lava trứng chảy", image: images.popularDish4 },
  //   { label: "Hộp thu Young", image: images.popularDish3 },
  // ];

  const initialValues = {
    ...filters,
  };

  return (
    <>
      <Backdrop open={isLoading} />
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
            setFilters({ ...values });
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
                      manufacturerList={manufacturerList}
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
                      {data?.data?.products?.map((item) => (
                        <ItemCard
                          key={item.id}
                          product={item}
                          refreshGetProduct={refreshGetProduct}
                        />
                      ))}
                    </div>

                    <Pagination
                      pageCount={20}
                      width={isLargerThanSm ? undefined : "100%"}
                      className="sm:ml-auto sm:mx-0 mx-auto mt-10"
                    />
                  </div>

                  <div className="col-span-full xl:hidden block">
                    <ProductFilterSideBar
                      values={values}
                      setFieldValue={setFieldValue}
                      manufacturerList={manufacturerList}
                      categoryList={categoryList}
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Products;
