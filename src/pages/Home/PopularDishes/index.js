import images from "../../../asset/images";
import ItemCard from "../../../components/ItemCard";
import { useGetProduct } from "../../../service/https";

function PopularDishes() {
  const { data, mutate: refreshGetProduct } = useGetProduct({
    limit: 4,
    page: 1,
  });

  let popularDishesList = data?.data?.products || [];

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
      <h2 className="xl:text-[42px] text-3xl font-semibold text-dark text-center mt-2">
        MÓN PHỔ BIẾN
      </h2>

      <div className="flex gap-4 justify-center mt-10 container">
        {popularDishesList.map((dish) => (
          <div className="w-[25%]">
            <ItemCard
              key={dish.id}
              product={dish}
              refreshGetProduct={refreshGetProduct}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularDishes;
