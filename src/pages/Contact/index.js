import { Form, Formik } from "formik";
import FormikTextField from "./../../components/Formik/FormikTextField";
import * as Yup from "yup";
import Button from "../../components/Button";
import Breadcrumb from "../../components/Breadcrumb";
import Divider from "../../components/Devider";
import Icon from "../../components/Icon";
import { useTranslation } from "react-i18next";
import FormikTextArea from "../../components/Formik/FormikTextArea";
import { TEXTFIELD_ALLOW } from "../../constants/common";
import { PATH } from "../../constants/path";
import Comment from "../Home/Comment";

function ContactUs() {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string().required("Họ tên là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    message: Yup.string().required("Tin nhắn là bắt buộc"),
  });

  // Initial values
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
  };

  const breadcrumbContact = [
    {
      label: "Trang chủ",
      path: PATH.HOME,
    },
    {
      label: "Liên hệ",
      path: PATH.CONTACT,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbContact} />

      <div className="container shadow-md p-14 my-14">
        <h3 className="text-[35px] text-dark font-semibold text-center">
          HÃY KẾT NỐI VỚI CHÚNG TÔI
        </h3>
        <p className="text-xl text-dark-400 text-center font-medium w-[60%] m-auto ">
          Bạn có đề xuất hoặc phản hồi? Chúng tôi rất sẵn sàng nghe ý kiến từ
          bạn! Sử dụng mẫu dưới đây để chia sẻ suy nghĩ của bạn. Cảm ơn bạn đã
          giúp chúng tôi cải thiện!
        </p>

        <div className="container py-14 flex gap-14">
          <div className="flex-1">
            <h2 className="text-[35px] font-semibold text-dark  p-4">
              THÔNG TIN LIÊN HỆ
            </h2>
            <Divider />

            <div className="flex flex-col gap-y-5 text-xl font-medium mt-7">
              <div className="flex items-center gap-2">
                <Icon name="location" size="1.2em" color="emerald" />
                <p className="text-emerald">Địa chỉ: </p>
                <p>{t("shopInfo.address")}</p>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="phone" size="1.2em" color="emerald" />
                <p className="text-emerald">Điện thoại: </p>
                <p className="">{t("shopInfo.phoneNumber")}</p>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="email" size="1.2em" color="emerald" />
                <p className="text-emerald">Email: </p>
                <p>{t("shopInfo.email")}</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ resetForm }) => (
                <Form>
                  <div className="flex flex-col gap-6 mt-7">
                    <FormikTextField
                      name="name"
                      label="Họ và tên:"
                      orientation="horizontal"
                      labelClassName="font-medium"
                      rightIcon={
                        <Icon name="user" size="1.5em" color="gray-400" />
                      }
                      required
                    />

                    <FormikTextField
                      name="email"
                      label="Email:"
                      orientation="horizontal"
                      labelClassName="font-medium"
                      type="email"
                      rightIcon={
                        <Icon name="email" size="1.5em" color="gray-400" />
                      }
                      required
                    />

                    <FormikTextField
                      name="phone"
                      label="Số điện thoại:"
                      orientation="horizontal"
                      labelClassName="font-medium"
                      rightIcon={
                        <Icon name="phone" size="1.5em" color="gray-400" />
                      }
                      allow={TEXTFIELD_ALLOW.NUMERIC}
                      required
                    />

                    <FormikTextArea
                      name="message"
                      label="Tin nhắn:"
                      orientation="horizontal"
                      labelClassName="font-medium"
                      required
                    />
                  </div>
                  <div className="flex mt-10">
                    <div className="flex gap-4 mr-auto">
                      <Button
                        type="submit"
                        rounded
                        className="text-xl"
                        size="large"
                        startIcon={<Icon name="send" size="1em" />}
                      >
                        GỬI ĐI
                      </Button>

                      <Button
                        type="button"
                        rounded
                        className="text-xl"
                        size="large"
                        bgColor="dark-500"
                        bgHoverColor="dark"
                        textHoverColor="white"
                        startIcon={<Icon name="refresh" size="1.2em" />}
                        onClick={() => resetForm()}
                      >
                        LÀM LẠI
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Comment />

      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7456.6298516158995!2d105.88085536557655!3d20.859352998337474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135b1798a40dc27%3A0xf7c2339b14b010fc!2zTGnDqm4gUGjGsMahbmcsIFRoxrDhu51uZyBUw61uLCBIYW5vaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1724488545942!5m2!1sen!2s"
        style={{ width: "100%", aspectRatio: "3/1" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe> */}
    </>
  );
}

export default ContactUs;
