import axios from "axios";

const TestApi = () => {

  const handleClick = async () => {
    try {
      const res = await axios.post('/api/payment', { data: true });
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-white bg-slate-800 rounded-full"
      type="button"
    >
      test
    </button>
  );
};

export default TestApi;
