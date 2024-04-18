import { useDispatch, useSelector } from "react-redux";
import { star } from "../assets/icons";
import { FaCartPlus, FaCheck } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/cart/cartSlice";

const PopularProductCard = ({ id, imgURL, name, price }) => {
  const state = useSelector((state) => state.cart);
  const itemExist = state.cart.find((item) => item.id === id);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (itemExist) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(addToCart({ id, quantity: 1 }));
    }
  };

  return (
    <div key={id} className="flex flex-1 flex-col w-full max-sm:w-full">
      <div className="relative">
        <img
          src={imgURL}
          alt={name}
          className="w-[282px] h-[282px] hover:border-2 hover:border-coral-red rounded-3xl"
        />
        <button
          onClick={handleClick}
          className="absolute top-2 left-2 text-coral-red p-2 bg-white rounded-full"
        >
          {itemExist ?  <FaCheck size={18} /> : <FaCartPlus size={20} /> }
        </button>
      </div>
      <div className="mt-6 flex justify-start gap-2.5">
        <img src={star} alt="rating icon" width={24} height={24} />
        <p className="font-montserrat text-xl leading-normal text-slate-gray">
          (4.{Math.floor(Math.random() * 10)})
        </p>
      </div>
      <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
        {name}
      </h3>
      <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
        {price}
      </p>
    </div>
  );
};

export default PopularProductCard;
