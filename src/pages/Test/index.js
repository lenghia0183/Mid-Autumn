import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import Field from "../../components/Formik";
import Button from "../../components/Button";
import * as Yup from "yup";

import Icon from "../../components/Icon";

import DrawerMenu from "../../components/DrawerMenu";
import { PropTypes } from "prop-types";

import ImageGallery from "../../components/ImageGallery";
import IconButton from "../../components/IconButton";
import FormikTextField from "../../components/Formik/FormikTextField";

const Test = () => {
  const initialValues = { gender: "", number: "100", haha: "female" };
  const [isOpenCart, setIsOpenCart] = useState(false);
  const nameRef = useRef();

  const validationSchema = Yup.object({
    name: Yup.string().required("Bạn phải chọn một tùy chọn."),
  });

  console.log(nameRef?.current);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted values:", values);
      }}
    >
      {() => (
        <Form>
          <>
            <Field.RadioGroup name="gender" orientation="horizontal">
              <Field.Radio label="nam" value="male" />
            </Field.RadioGroup>

            <Field.Radio
              label="nu"
              name="haha"
              value="female"
              orientation="vertical"
              disabled={true}
            />

            <div className="">
              <FormikTextField
                name="name"
                label="Họ và tên"
                width="lg:w-[800px] md:w-[500px] w-[50px]"
                labelWidth="100px"
                className="m-auto mt-1"
                height="50px"
                // orientation="horizontal"
                rightIcon={
                  <Icon name="arrowDown" color="crimson" size="20px" />
                }
              />
            </div>

            <Field.CheckBox
              name="hello"
              label="Xin chào"
              orientation="horizontal"
              className="m-auto"
              disabled={true}
            />

            <Button
              size="medium"
              variant="text"
              textColor="crimson"
              className="box-border m-auto mt-3"
              onClick={() => {
                setIsOpenCart(true);
              }}
            >
              Mở
            </Button>

            <DrawerMenu
              animationDuration={500}
              renderContent={() => {
                return (
                  <div className="p-4 pt-0">
                    <div className="h-px w-full bg-dark-100 mb-5"></div>
                    <div>
                      <p>Giỏ hàng của bạn hiện đang trống</p>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                      <div className="text-dark-200">Tổng tiền</div>
                      <div className="text-crimson-100 text-right">0đ</div>
                    </div>

                    <div className="h-px w-full bg-dark-100 mt-5"></div>

                    <Button
                      className="w-full bg-crimson mt-4 text-white-200"
                      variant="fullWidth"
                    >
                      GIỎ HÀNG
                    </Button>

                    <Button
                      className="w-full bg-yellow mt-4 text-white-200"
                      variant="fullWidth"
                    >
                      Đặt hàng
                    </Button>
                  </div>
                );
              }}
              renderTitle={() => {
                return (
                  <div className="flex items-center justify-between text-2xl">
                    <h3>Giỏ hàng của bạn</h3>
                    <Button
                      variant="text"
                      className="m-0 p-0"
                      startIcon={<Icon size="2em" name="close" />}
                      onClick={() => {
                        setIsOpenCart(false);
                      }}
                    ></Button>
                  </div>
                );
              }}
              borderColor="crimson"
              position="top"
              width="xl:w-[800px] lg:w-[500px] md:w-[300px] sm:w-[100px] w-full"
              isOpen={isOpenCart}
              handleOverlayClick={() => {
                setIsOpenCart(false);
              }}
            />

            <Button
              variant="text"
              rounded
              width="300px"
              className="box-border m-auto mt-3"
              onClick={() => {
                setIsOpenCart(true);
              }}
            >
              Mở
            </Button>

            <Button
              variant="outlined"
              textColor="blue"
              borderColor="blue-300"
              rounded
              bgHoverColor="blue-300"
              className="box-border m-auto mt-3"
              onClick={() => {
                setIsOpenCart(true);
              }}
            >
              Ai sợ thì đi về
            </Button>

            <Button
              type="submit"
              variant="contained"
              bgColor="crimson"
              bgHoverColor="yellow"
              textColor="white-300"
              className="box-border m-auto mt-3 border"
              rounded
              startIcon={<Icon color="test-500" size="2em" name="close" />}
            ></Button>

            <ImageGallery
              className="my-10 m-auto"
              width="60%"
              height=""
              fadeEffect={false}
              images={[
                {
                  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP3LAN10XycHIs3slzNl6f5UfOtwnW1biSng&s",
                  alt: "alt 1",
                },
                {
                  src: "https://images.unsplash.com/photo-1720048170970-3848514c3d60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
                  alt: "alt 2",
                },
                {
                  src: "https://plus.unsplash.com/premium_photo-1664303000625-9da917c7fcfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
                  alt: "alt 3",
                },
                {
                  src: "https://images.unsplash.com/photo-1723387046130-191915c3ba2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
                  alt: "alt 1",
                },
                {
                  src: "https://plus.unsplash.com/premium_photo-1671641753643-f26f5e811d57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
                  alt: "alt 1",
                },
                {
                  src: "https://images.unsplash.com/photo-1723376121479-97140b8f2713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "alt 1",
                },
                {
                  src: "https://plus.unsplash.com/premium_photo-1673795754005-214e3e1fccba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
                  alt: "alt 1",
                },
                {
                  src: "https://images.unsplash.com/photo-1723130039043-2af7d9d64754?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "alt 1",
                },
                {
                  src: "https://images.unsplash.com/photo-1721468932356-8e22662ea4b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "alt 1",
                },
                {
                  src: "https://images.unsplash.com/photo-1719937206158-cad5e6775044?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D",
                  alt: "alt 1",
                },
              ]}
            />

            <div className="m-auto">
              <IconButton
                bgColor="blue-200"
                // variant="contained"
                variant="text"
                bgHoverColor="test"
                icon={
                  <Icon
                    name="arrowRight"
                    color="tranparent"
                    // className="tranform rotate-90"
                  />
                }
              />

              <IconButton
                size="large"
                variant="outlined"
                icon={
                  <Icon
                    size="1"
                    name="arrowDown"
                    className="tranform -rotate-90"
                    color="crimson"
                  />
                }
              />
            </div>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default Test;
