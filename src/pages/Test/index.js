import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import Field from "../../components/Formik";
import Button from "../../components/Button";
import * as Yup from "yup";
import {
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from "../../constants/common";
import Icon from "../../components/Icon";
import Accordion from "../../components/Accordion";
import DrawerMenu from "../../components/DrawerMenu";
import { PropTypes } from "prop-types";
import Image from "../../components/Image";
import ImageGallery from "../../components/ImageGallery";
import IconButton from "../../components/IconButton";

const Test = () => {
  const initialValues = { gender: "", number: "100", haha: "female" };
  const [isOpenCart, setIsOpenCart] = useState(false);
  const nameRef = useRef();

  const validationSchema = Yup.object({
    gender: Yup.string().required("Bạn phải chọn một tùy chọn."),
  });
  const accordionItems = [
    {
      title: "Item 1",
      content: (
        <div>
          Content for item 1<h1>le cong nghia</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
          expedita, assumenda doloremque voluptatem vel veritatis cupiditate
          impedit rerum odio qui. Vero, a aliquid magnam repellat provident,
          cupiditate ex similique obcaecati corrupti reprehenderit blanditiis
          doloribus dolor dicta laboriosam dignissimos rerum voluptatum libero
          in excepturi quidem laudantium possimus ipsam, eos deleniti. Deleniti
          possimus unde, libero maiores, omnis ipsa modi rerum maxime autem
          tempore expedita provident repudiandae ea aliquam ex voluptatum
          perferendis! Autem itaque laborum debitis quo laboriosam atque, optio
          numquam quaerat, totam natus tempora iusto, ipsam placeat vero.
          Tempora fugiat vel autem sequi ipsum animi molestias eaque totam quo
          nesciunt velit voluptate harum quaerat excepturi pariatur doloremque
          voluptas commodi laborum suscipit delectus, optio corrupti nobis neque
          facilis. Ullam saepe iste reprehenderit quia unde. Nam maxime
          consequatur sunt odit eligendi cumque minima, voluptate vitae culpa
          ratione voluptatem vel sit itaque repellendus rerum iure cum mollitia
          hic accusamus blanditiis enim odio repellat facilis neque. Amet,
          consectetur illo quo ex, voluptate corrupti natus esse temporibus,
          soluta ipsum provident iusto itaque nemo doloremque rem sunt
          exercitationem? Quae fuga obcaecati laborum? Aspernatur nihil
          cupiditate eligendi dolorem tenetur quam labore vitae ipsa esse,
          dignissimos maiores minus. Consequuntur aliquid illo corporis veniam
          saepe, tempore porro facere temporibus quis facilis itaque fugit vel
          omnis repellendus delectus natus eius! Illo soluta ducimus minus
          quasi, aspernatur ea? Neque laboriosam nemo eius ex. Labore quibusdam
          iusto est minima excepturi repellendus minus fugit voluptates
          accusantium aliquam! Sapiente nisi provident itaque hic. Neque quas
          alias odio sunt debitis animi, distinctio explicabo id voluptas
          inventore facilis maxime pariatur odit, eius rerum illum voluptatibus
          excepturi dolore amet? Vitae odio soluta laboriosam repellendus
          assumenda culpa asperiores numquam totam sint delectus ex
          exercitationem amet, veritatis voluptates maiores quibusdam suscipit
          cupiditate dicta? Delectus temporibus beatae debitis deleniti, tempore
          rerum ipsum, at iusto fugit asperiores quos, repellat laborum.
          Molestiae necessitatibus, sapiente soluta dolores sed voluptas totam
          impedit perspiciatis! Accusantium tenetur molestias excepturi aut, sed
          tempora explicabo, nemo iusto, aliquam inventore eaque earum dolor.
          Vitae consectetur iusto perspiciatis quia veniam! Assumenda obcaecati
          dolorem iure perferendis accusamus. Libero officiis illo quis, quia,
          amet aliquid culpa natus alias quos reiciendis ipsam, iure veniam et
          tempora ut! Quas temporibus, qui, iusto at libero praesentium sunt et
          minima, cupiditate nostrum nam aspernatur reiciendis! Repudiandae at
          dicta recusandae facere ipsam aliquid, sequi, optio consequatur unde
          sunt iusto iure ab voluptates. Voluptatem, temporibus, autem, amet
          dolor perspiciatis quos repellendus reiciendis ipsa aut est dolorem
          ipsam laudantium neque suscipit voluptates accusantium facilis sed
          nobis nostrum. Enim, praesentium quo beatae nisi, necessitatibus
          distinctio rerum velit voluptatibus est eius accusantium a nam saepe,
          maxime ea? Dolore veniam pariatur laudantium corrupti optio expedita
          praesentium rem voluptas quasi totam veritatis tempore, voluptates,
          culpa aliquam odio facere impedit minus? Delectus velit voluptate
          voluptates deleniti architecto ipsa voluptas iste quas, reprehenderit
          similique facilis numquam doloremque voluptatum praesentium corporis
          aut aspernatur totam temporibus, soluta blanditiis facere placeat cum
          dolorem. Veritatis in est tempora quo illo porro optio cumque
          asperiores placeat quaerat, esse error ratione, ut voluptas voluptatum
          ipsa animi mollitia quasi, natus veniam obcaecati minima fugit.
        </div>
      ),
    },
    { title: "Item 2", content: <div>Content for item 2</div> },
  ];

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
            <Accordion
              items={accordionItems}
              allowMultipleOpen={true}
              width="80%"
              className="m-auto mt-10"
            />

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

            <Field.TextField
              name="number"
              label="Chữ và số"
              width="20%"
              className="m-auto"
              orientation="horizontal"
              // disabled={true}
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              inputProps={{
                maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_10,
              }}
            />

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

            <Field.TextField
              ref={nameRef}
              aaa="aaa"
              name="name"
              label="Họ tên"
              placeholder="Họ tên"
              width="200px"
              className="m-auto"
              height="50px"
            />

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

                    <Accordion
                      items={accordionItems}
                      allowMultipleOpen={true}
                      className="m-auto mt-10"
                    />

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
                      startIcon={<Icon size="2em" name="closeCircle" />}
                      onClick={() => {
                        setIsOpenCart(false);
                      }}
                    ></Button>
                  </div>
                );
              }}
              borderColor="crimson"
              position="left"
              width="350px"
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
