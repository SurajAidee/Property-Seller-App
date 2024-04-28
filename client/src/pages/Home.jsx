import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import PostItem from "../components/PostItem";
import { Button } from "flowbite-react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [offerPosts, setOfferPosts] = useState([]);
  const [salePosts, setSalePosts] = useState([]);
  const [rentPosts, setRentPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  SwiperCore.use([Navigation]);
  console.log(offerPosts);
  useEffect(() => {
    const fetchOfferPosts = async () => {
      try {
        const res = await fetch("/api/post/get?offer=true&limit=6");
        const data = await res.json();
        setOfferPosts(data);
        fetchRentPosts();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentPosts = async () => {
      try {
        const res = await fetch("/api/post/get?type=rent&limit=6");
        const data = await res.json();
        setRentPosts(data);
        fetchSalePosts();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSalePosts = async () => {
      try {
        const res = await fetch("/api/post/get?type=sale&limit=6");
        const data = await res.json();
        setSalePosts(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div>
      {/* top */}
      {/* <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Paschimeli Real Estate is the best place to find your next perfect
          place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/house"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div> */}

      {/* swiper */}

      <Swiper navigation>
        {offerPosts &&
          offerPosts.length > 0 &&
          offerPosts.map((post) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${post.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={post._id}
              >
                <div className="relative z-30 flex flex-col items-center w-full pt-12">
                  <p className="text-white text-[32px] sm:text-[57px] font-bold">
                    To each their home.
                  </p>
                  <p className="text-white  pt-2 sm:pt-0  sm:text-[23px]  ">
                    Let's find a home that's perfect for you
                  </p>
                  {/* Input */}
                  <div className="relative mt-9  ">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className="bg-white py-4  w-[28rem] sm:w-[37rem] rounded-full pl-5 placeholder:text-gray-500 placeholder:text-[20px] outline-0 dark:text-black"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Button className="absolute w-[2.7rem] h-[2.7rem] rounded-full  bg-[#e20112] top-[0.4rem] right-1 flex items-center justify-center dark:bg-[#e20112]">
                        <FaSearch className="text-white text-[22px]" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerPosts && offerPosts.length > 0 && (
          <div className="text-white">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-white">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline dark:text-blue-500"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerPosts.map((post) => (
                <PostItem post={post} key={post._id} />
              ))}
            </div>
          </div>
        )}
        {rentPosts && rentPosts.length > 0 && (
          <div className="text-white">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-white">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline dark:text-blue-500"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentPosts.map((post) => (
                <PostItem post={post} key={post._id} />
              ))}
            </div>
          </div>
        )}
        {salePosts && salePosts.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 dark:text-white">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline dark:text-blue-500"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {salePosts.map((post) => (
                <PostItem post={post} key={post._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
