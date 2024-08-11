import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">
        Chào Mừng Đến Với Cửa Hàng Bánh {t('title')} Của Chúng Tôi!
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-lg">
        Khám phá các loại bánh Trung Thu ngon miệng, từ truyền thống đến hiện
        đại. Chúng tôi mang đến cho bạn những trải nghiệm tuyệt vời nhất trong
        mùa Trung Thu này!
      </p>
      <div className="flex space-x-4">
        <Link to="/search">
          <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">
            Tìm Kiếm Bánh
          </button>
        </Link>
        <Link to="/products">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
            Xem Các Loại Bánh
          </button>
        </Link>

        <Link to="/about">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
            Về chúng tôi
          </button>
        </Link>

        <Link to="/test">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">
            Test
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
