import images from "../../../asset/images";
import ItemCard from "../../../components/ItemCard";

function PopularDishes() {
  const popularDishesList = [
    {
      id: 1,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish1,
      rating: 2.5,
      alt: "Banner 1",
    },
    {
      id: 2,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish2,
      rating: 5,
      alt: "Banner 1",
    },
    {
      id: 3,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish3,
      rating: 4,
      alt: "Banner 1",
    },
    {
      id: 4,
      name: "Trăng vàng hoàng kim vinh hiển đỏ",
      price: "1.300.000 đ",
      image: images.popularDish4,
      rating: 5,
      alt: "Banner 1",
    },
  ];

  return (
    <section
      className="mt-10 pb-14"
      style={{
        backgroundImage: `url(${images.productPageBg})`,
      }}
    >
      <h4 className="sm:text-xl text-lg text-emerald font-medium text-center pt-4">
        Mid Autumn Festival
      </h4>
      <h2 className="xl:text-[42px] text-3xl font-semibold text-dark text-center mt-3">
        MÓN PHỔ BIẾN
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-5 container">
        {popularDishesList.map((dish) => (
          <ItemCard key={dish.id} product={dish} />
        ))}
      </div>
    </section>
  );
}

export default PopularDishes;
