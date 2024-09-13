import images from "../../../asset/images";
import Button from "../../../components/Button";
import { PATH } from "../../../constants/path";

function ThirdSection() {
  return (
    <section
      style={{
        backgroundImage: `url(${images.slide1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="py-[150px] flex items-center justify-center mt-10 relative"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.19)",
        }}
        className="h-full w-full absolute inset-0 pointer-events-none"
      ></div>
      <div className="text-center w-[40%] p-10 z-[1000]">
        <p className="text-xl text-yellow font-semibold">Mid Autumn Festival</p>
        <h2 className="text-[50px] font-semibold text-white mt-3">
          ĂN BÁNH TRUNG THU <br /> <span className="block">NGỌT NGÀO</span>
        </h2>
        <Button
          rounded
          textColor="white"
          bgColor="emerald"
          bgHoverColor="yellow"
          textHoverColor="dark"
          size="large"
          to={PATH.PRODUCTS}
          className="m-auto font-semibold px-10 mt-5"
        >
          XEM MENU
        </Button>
      </div>
    </section>
  );
}

export default ThirdSection;
