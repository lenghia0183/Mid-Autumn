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

function ProductDetail() {
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
      label: "Bánh trung thu cao cấp",
    },
  ];

  const itemDetail = {
    name: "Trăng vàng hoàng kim vinh hiển đỏ",
    state: "Còn hàng",
    branch: "Kinh Đô",
    category: "Bánh trung thu cao cấp",
    code: "000059",
    price: 1300000,
    discount: 10,
    image: "/images/products/popular-dish-1.jpg",
    description:
      "Trăng vàng hoàng Kim Vinh Hiển Đỏ là món quà gói gọn lòng trân quý, thiết kế của Trăng Vàng Hoàng Kim Đỏ đầy tinh tế với những nét họa tiết mềm mại trên nền đỏ thắm, làm nổi bật Hoàng Kim vương giả. Ẩn chứa bên trong là hương vị độc đáo của thịt sốt tương BBQ, Gà quay tứ quý,..đặc biệt là bánh Cua Huỳnh Đế - một món quà quý của biển cả khiến người thưởng thức sẽ còn đọng mãi dư vị trung thu.",
  };

  const tagList = [
    {
      label: "Bánh trung thu",
      to: PATH.PRODUCTS,
    },
    {
      label: "Bánh trung thu cao cấp",
      to: PATH.PRODUCTS,
    },
    {
      label: "Trăng vàng hoàng kim vinh hiển đỏ",
      to: PATH.PRODUCTS,
    },
  ];

  const tabList = [
    { label: "Thông tin sản phẩm", value: "product-info" },
    { label: "Bình Luận", value: "product-info" },
  ];

  return (
    <Formik
      initialValues={{ quantity: 1 }} // Thêm initialValues cho Formik
      onSubmit={(values) => {
        console.log(values); // Xử lý logic khi form được submit
      }}
    >
      <Form>
        <div className="bg-white">
          <Breadcrumb items={productDetailBreadcrumbs} />
          <div className="container grid grid-cols-12 gap-x-7 py-14 ">
            {/* gallery */}
            <div className="col-span-6">
              <ProductGallery />
            </div>

            {/* info */}
            <div className="col-span-6 text-dark">
              <h1 className="text-[45px] font-medium">{itemDetail?.name}</h1>
              <p className="text-xl font-medium mt-3">
                Tình trạng tồn kho:{" "}
                <span className="text-emerald">{itemDetail?.state}</span>
              </p>

              <div className="flex gap-2 text-xl font-medium mt-3">
                <p>
                  Thương hiệu:
                  <span className="text-emerald ml-3">
                    {itemDetail?.branch}
                  </span>
                </p>
                <p>|</p>
                <p>
                  Mã sản phẩm:
                  <span className="text-emerald ml-3">{itemDetail?.code}</span>
                </p>
              </div>
              <p className="text-[30px] text-emerald font-semibold mt-3">
                {formatCurrency(itemDetail?.price)}
              </p>
              <p className="text-[17px] mt-3">{itemDetail?.description}</p>

              <div className="flex gap-5 mt-10">
                <div className="w-[30%]">
                  <FormikQuantityInput
                    name="quantity"
                    height="50px"
                    buttonClassName="bg-white-100"
                  />
                </div>
                <Button className="flex-shrink-0 text-xl">SO SÁNH</Button>
                <Button className="flex-shrink-0 text-xl">YÊU THÍCH</Button>
              </div>

              <Button
                bgColor="yellow"
                textColor="dark"
                bgHoverColor="emerald"
                textHoverColor="white"
                size="large"
                className="mt-5 text-xl font-semibold"
              >
                THÊM VÀO GIỎ HÀNG
              </Button>

              <div className="shadow-sm mt-5 flex items-center gap-4 py-2 px-3">
                <Icon name="tag" color="emerald" />
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

              <Tabs className="mt-5" list={tabList} divider={true}>
                <div className="text-dark-400 text-lg flex flex-col gap-3">
                  <p>
                    Thương hiệu: <span>{itemDetail.branch}</span>
                  </p>

                  <p>
                    Loại bánh: <span>{itemDetail.category}</span>
                  </p>

                  <p>
                    Mã sản phẩm: <span>{itemDetail.code}</span>
                  </p>

                  <p>{itemDetail?.description}</p>
                </div>
                <div></div>
              </Tabs>
            </div>

            <div className="col-span-12 mt-14">
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
  );
}
export default ProductDetail;