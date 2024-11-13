import { assets } from "../assets/assets";
import SubscriptionBox from "../components/SubscriptionBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709 Williams Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: +234-913-388-9626
            <br /> Email: mayordev18@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="transition-all rounded-md hover:scale-105 border border-black px-8 py-4 text-sm hover:bg-black hover:text-white ">
            Explore Jobs
          </button>
        </div>
      </div>
      <SubscriptionBox />
    </div>
  );
};

export default Contact;
