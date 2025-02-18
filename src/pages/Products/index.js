import { Suspense, useEffect, useState } from "react";
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

import { useGetCategory } from "../../service/https/category";

import { useLoading } from "../../context/loadingContext";

function Products() {
  const { setLoading, isLoading } = useLoading();

  const breadcrumbItems = [
    { label: PAGE_TITLE.HOME, to: PATH.HOME },
    { label: PAGE_TITLE.PRODUCT, to: PATH.PRODUCTS },
  ];

  const { filters, setFilters, page } = useQueryState({
    filters: {
      rating: 1,
      displayOption: "createdAt:desc",
      maxPrice: null,
      minPrice: null,
      keyword: "",
    },
  });

  const {
    data,
    isLoading: isGetProductLoading,
    isValidating: isGetProductValidating,
    mutate: refreshGetProduct,
  } = useGetProduct({
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    keyword: filters.keyword || "",
    minRating: filters.rating,
    categoryId: filters.category,
    manufacturerId: filters.manufacturers,
    limit: 6,
    sortBy: filters?.displayOption,
    page: page,
    // manufacturerId: [...filters],
  });
  const { data: manufacturerList } = useGetManufacturer();
  const { data: categoryList } = useGetCategory();

  // console.log("useGetProduct", useGetProduct());
  // console.log("filters", filters);
  // console.log("items", data);
  // console.log("manufacturerList", manufacturerList);
  // console.log("categoryList", categoryList);

  useEffect(() => {
    refreshGetProduct();
  }, [filters, page]);

  // if (
  //   isGetCategoryLoading ||
  //   isGetManufacturerLoading ||
  //   isGetProductLoading ||
  //   isGetProductValidating
  // ) {
  //   setLoading(true);
  // } else {
  //   setLoading(false);
  // }

  const isLargerThanSm = useBreakpoint("sm");

  // console.log("loading", isLoading);

  const initialValues = {
    ...filters,
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${images.productPageBg})`,
        }}
      >
        <Breadcrumb items={breadcrumbItems} />
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            // console.log("products values", values);
            const convertValues = {
              keyword: values?.keyword,
              category: values?.category,
              rating: values?.rating,
              displayOption: values?.displayOption,
              minPrice: values?.minPrice,
              maxPrice: values?.maxPrice,
              manufacturers: Object.keys(values).filter(
                (key) => values[key] === true
              ),
            };

            // console.log("convert values", convertValues);

            setFilters({ ...convertValues });
          }}
        >
          {({ setFieldValue, values, resetForm }) => (
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
                      resetForm={resetForm}
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
                      pageCount={data?.data?.totalPage}
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
                      resetForm={resetForm}
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
