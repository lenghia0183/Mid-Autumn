import React from "react";
import Breadcrumb from "./../../components/Breadcrumb/index";
import { PAGE_TITLE, PATH } from "./../../constants/path";
import Image from "../../components/Image";
import images from "../../asset/images";
import Reason from "./../Home/Reason/index";
import Comment from "../Home/Comment";

const About = () => {
  const aboutBreadcrumb = [
    {
      label: PAGE_TITLE.HOME,
      to: PATH.HOME,
    },
    {
      label: PAGE_TITLE.ABOUT,
      to: PATH.ABOUT,
    },
  ];

  return (
    <div className="bg-white">
      <Breadcrumb items={aboutBreadcrumb} />
      <div className="container grid grid-cols-2 gap-8 items-center mt-14">
        <div className="text-dark text-xl">
          <p className="text-[30px] font-medium text-emerald">Giới thiệu</p>
          <h2 className="mt-7 text-[50px] font-semibold">
            Mid Autumn Festival
          </h2>
          <p className="mt-10">
            Chúng tôi xin chân thành cảm ơn sự quan tâm của quý khách hàng trong
            suốt thời gian qua đã ủng hộ tin tưởng sản phẩm của chúng tôi!
          </p>
          <p className="mt-5">
            Trung Thu năm nay, ấn tượng nhất về sự đầu tư, sáng tạo của Kinh Đô
            là dòng sản phẩm thượng hạng Trăng Vàng. Với ý nghĩa châu báu của
            đời người là tình thân và các mối giao hảo, Kinh Đô ra mắt bộ sưu
            tập Trăng Vàng với các bộ sản phẩm hoàn toàn mới: Trăng Vàng Kim
            Cương, Trăng Vàng Bạch Kim, Trăng Vàng Hoàng Kim, Trăng Vàng Hồng
            Ngọc cùng các hương vị bánh mới với thành phần nguyên liệu thượng
            hạng như: Sò điệp Nhật xốt X.O, Cua Huỳnh Đế, Tôm Càng Bách Hoa, Gà
            quay Tứ Quý.
          </p>
          <p className="mt-5">
            Chúng tôi cũng là một trong những thương hiệu bánh được người tiêu
            dùng bình chọn là hàng Việt Nam chất lượng cao. Thành công đó có
            được là nhờ những phấn đấu không ngừng có mặt trên thị trường của
            tập thể quản lý, nhân viên và thợ làm bánh.
          </p>
          <p className="mt-5">
            Nhưng trên hết, chúng tôi mong muốn gửi đến Quý khách hàng lời cảm
            ơn chân thành nhất vì đã ủng hộ thương hiệu bánh trong suốt thời
            gian vừa qua. Chúng tôi tin tưởng với sự cố gắng của mình và sự ưu
            ái của Quý khách hàng, chúng tôi sẽ không ngừng lớn mạnh để phục vụ
            người tiêu dùng ngày càng tốt hơn.
          </p>
        </div>

        <div className="rounded-full h-full flex">
          <Image
            height="100%"
            width="100%"
            src={images.home1}
            className="rounded-full object-cover h-full"
          />
        </div>
      </div>
      =
      <Reason
        containerClassName="mt-20 "
        titleClassName="text-[30px] font-medium text-emerald"
        headingClassName="!text-[50px] font-semibold"
        descClassName="text-xl"
      />
      <div className="container grid grid-cols-2 gap-8 items-center mt-14">
        <div className="text-dark text-xl flex flex-col">
          <p className="text-[30px] font-medium text-emerald">Giới thiệu</p>
          <h2 className="mt-7 text-[50px] font-semibold">
            Tầm Nhìn và Sứ Mệnh
          </h2>
          <p className="mt-10">
            Chúng tôi hướng đến việc trở thành thương hiệu bánh Trung Thu số 1
            tại Việt Nam, với cam kết mang đến những sản phẩm thượng hạng, an
            toàn và sáng tạo, để làm hài lòng mọi khách hàng.
          </p>
          <p className="mt-5">
            Sứ mệnh của chúng tôi là không ngừng sáng tạo, nâng cao chất lượng
            và mang đến những trải nghiệm tuyệt vời cho khách hàng trong từng
            sản phẩm, vì tình thân và các mối giao hảo.
          </p>
          <p className="mt-5">
            Chúng tôi tin rằng sự thành công không chỉ đến từ việc cung cấp sản
            phẩm chất lượng mà còn từ sự tận tâm trong từng khâu sản xuất, đóng
            gói, và phục vụ khách hàng. Từng chiếc bánh mà chúng tôi tạo ra đều
            là một tác phẩm nghệ thuật, chứa đựng không chỉ hương vị mà còn cả
            tình yêu và sự tôn trọng đối với khách hàng.
          </p>
          <p className="mt-5">
            Trong tương lai, chúng tôi sẽ không ngừng phát triển và nâng cấp quy
            trình sản xuất, áp dụng công nghệ hiện đại để mang đến cho người
            tiêu dùng những trải nghiệm tốt nhất. Đồng thời, chúng tôi cam kết
            bảo vệ môi trường, tối ưu hóa sử dụng nguồn tài nguyên, và luôn đồng
            hành cùng sự phát triển bền vững.
          </p>
          <p className="mt-4 text-xl text-dark">
            Mỗi sản phẩm không chỉ là một món quà ý nghĩa trong dịp Trung Thu,
            mà còn là một biểu tượng của tình cảm và sự gắn kết mà chúng tôi
            muốn truyền tải đến mỗi gia đình Việt Nam. Với tầm nhìn xa rộng và
            sứ mệnh vững chắc, chúng tôi mong muốn mang đến những giá trị lâu
            dài, tạo nên niềm tin và sự yêu thương từ người tiêu dùng.
          </p>
        </div>

        <div className="">
          <Image
            height="90%"
            width="90%"
            src={images.childrenBanner2}
            className="rounded-full object-cover h-full"
          />
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default About;
