import React from "react";
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

const Test = () => {
  const initialValues = { gender: "", number: "100", haha: "female" };

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
            ></Accordion>

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
              className="m-auto mt-5 w-1/5"
              type="submit"
              color="gray-text-500"
              startIcon={
                <Icon size="2em" name="closeCircle" color="text-red-500" />
              }
            >
              Gui
            </Button>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default Test;
