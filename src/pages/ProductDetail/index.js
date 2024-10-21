import { Form, Formik } from "formik";
import Breadcrumb from "../../components/Breadcrumb";
import FormikQuantityInput from "../../components/Formik/FormikQuantityInput";
import { PATH } from "../../constants/path";
import formatCurrency from "../../utils/formatCurrency";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Tabs from "../../components/Tabs";
import ProductGallery from "../../components/ProductGallery";
import Divider from "../../components/Devider";
import RelatedProducts from "../../components/RelatedProducts";
import { useGetProductDetail } from "../../service/https";
import { useParams } from "react-router-dom";
import Backdrop from "../../components/BackDrop";
import { isArray } from "lodash";
import { useAddProductToCart } from "../../service/https/cart";
import { toast } from "react-toastify";
import { validateStatus } from "../../utils/api";

function ProductDetail() {
  const params = useParams();
  const { data: itemDetail, isLoading } = useGetProductDetail(params.productId);
  const { trigger: addProductToCart } = useAddProductToCart();
  const productDetailBreadcrumbs = [
    {
      label: "Trang chủ",
      to: PATH.HOME,
    },
    {
      label: "Sản phẩm",
      to: PATH.PRODUCTS,
    },
    {
      label: itemDetail?.categoryId?.name,
    },
  ];

  console.log("itemDetail", itemDetail);

  const tagList = [
    {
      label: "Bánh trung thu",
      to: PATH.PRODUCTS,
    },
    {
      label: itemDetail?.categoryId?.name,
      to: PATH.PRODUCTS,
    },
    {
      label: itemDetail?.name,
      to: PATH.PRODUCT_DETAIL.replace(":productId", itemDetail?._id),
    },
  ];

  const tabList = [
    { label: "Thông tin sản phẩm", value: "product-info" },
    { label: "Bình Luận", value: "product-info" },
  ];

  return (
    <>
      <Backdrop open={isLoading} />
      <Formik
        initialValues={{ quantity: 1 }}
        onSubmit={(values) => {
          console.log(values);

          const convertValues = {
            productId: itemDetail?._id,
            quantity: values.quantity,
          };

          addProductToCart(convertValues, {
            onSuccess: (response) => {
              console.log(response);
              if (validateStatus(response.code)) {
                toast.success(response.message);
              } else {
                toast.error(response?.message);
              }
            },
            onError: () => {
              toast.error(
                "Thêm sản phẩm vào giỏ hàng thất bại vui lòng thử lại"
              );
            },
          });
        }}
      >
        <Form>
          <div className="bg-white">
            <Breadcrumb items={productDetailBreadcrumbs} />
            <div className="container grid grid-cols-12 gap-x-7 py-14 gap-y-10">
              {/* gallery */}
              <div className="xl:col-span-6 col-span-full">
                <ProductGallery
                  images={isArray(itemDetail?.images) ? itemDetail?.images : []}
                />
              </div>

              {/* info */}
              <div className="xl:col-span-6 col-span-full text-dark">
                <h1 className="sm:text-[45px] text-[38px] leading-tight font-medium">
                  {itemDetail?.name}
                </h1>
                <p className="text-xl font-medium mt-3">
                  Tình trạng tồn kho:{" "}
                  <span className="text-emerald">
                    {itemDetail?.inStock ? "Còn hàng" : "Hết hàng"}
                  </span>
                </p>

                <div className="sm:flex gap-2 text-xl font-medium xl:mt-3 mt-3">
                  <p>
                    Thương hiệu:
                    <span className="text-emerald ml-3">
                      {itemDetail?.manufacturerId?.name}
                    </span>
                  </p>
                  <p className="sm:inline-block hidden">|</p>
                  <p className="mt-1 xl:mt-0">
                    Mã sản phẩm:
                    <span className="text-emerald ml-3">
                      {itemDetail?.code}
                    </span>
                  </p>
                </div>
                <p className="text-[30px] text-emerald font-semibold mt-3">
                  {formatCurrency(itemDetail?.price)}
                </p>
                <p className="text-[17px] mt-3">{itemDetail?.description}</p>

                <div className="flex flex-col sm:flex-row gap-5 mt-5">
                  <div className="sm:w-[30%] w-[70%]">
                    <FormikQuantityInput
                      name="quantity"
                      height="50px"
                      buttonClassName="bg-white-100"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-shrink-0 text-xl">SO SÁNH</Button>
                    <Button className="flex-shrink-0 text-xl">YÊU THÍCH</Button>
                  </div>
                </div>

                <Button
                  bgColor="yellow"
                  textColor="dark"
                  bgHoverColor="emerald"
                  textHoverColor="white"
                  size="large"
                  className="sm:mt-5 mt-3 text-xl font-semibold"
                >
                  THÊM VÀO GIỎ HÀNG
                </Button>

                <div className="shadow-sm sm:mt-5 mt-3 flex items-center gap-4 py-2 px-3">
                  <Icon name="tag" color="emerald" />
                  <div className="flex sm:flex-row flex-col flex-wrap sm:gap-4 gap-2">
                    {tagList.map((tag, index) => (
                      <div key={index} className="mr-2">
                        <Button
                          className="flex-shrink-0 font-medium"
                          size="zeroPadding"
                          bgColor="white"
                          textColor="dark-300"
                          textHoverColor="emerald"
                          to={tag.to}
                        >
                          {tag.label}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Tabs className="sm:mt-5 mt-3" list={tabList} divider={true}>
                  <div className="text-dark-400 text-lg flex flex-col gap-3">
                    <p>
                      Thương hiệu:{" "}
                      <span>{itemDetail?.manufacturerId?.name}</span>
                    </p>

                    <p>
                      Loại bánh: <span>{itemDetail?.categoryId?.name}</span>
                    </p>

                    <p>
                      Mã sản phẩm: <span>{itemDetail?.code}</span>
                    </p>

                    <p>{itemDetail?.description}</p>
                  </div>
                  <div></div>
                </Tabs>
              </div>

              <div className="col-span-12 sm:mt-14">
                <h2 className="text-emerald text-[35px] font-medium">
                  SẢN PHẨM LIÊN QUAN
                </h2>
                <Divider color="emerald" height="2px" />

                <RelatedProducts />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default ProductDetail;
