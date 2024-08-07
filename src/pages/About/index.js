import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">
        Giới Thiệu Về Chúng Tôi
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Chúng tôi là một cửa hàng chuyên cung cấp các loại bánh Trung Thu thơm
        ngon, được làm từ nguyên liệu tươi ngon và chất lượng nhất. Với mong
        muốn mang đến cho khách hàng những trải nghiệm tuyệt vời trong mùa Trung
        Thu, chúng tôi cam kết đem đến những chiếc bánh không chỉ đẹp mắt mà còn
        ngon miệng.
      </p>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Chúng tôi luôn chú trọng đến sự hài lòng của khách hàng và liên tục cải
        tiến sản phẩm của mình để đáp ứng nhu cầu đa dạng của người tiêu dùng.
        Hãy đến với chúng tôi để thưởng thức những chiếc bánh Trung Thu tuyệt
        vời nhất!
      </p>
    </div>
  );
};

export default About;
