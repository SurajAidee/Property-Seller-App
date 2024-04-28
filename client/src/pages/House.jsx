import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import PostItem from "../components/PostItem";

export default function Home() {
  const [offerPosts, setOfferPosts] = useState([]);
  const [salePosts, setSalePosts] = useState([]);
  const [rentPosts, setRentPosts] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerPosts);
  useEffect(() => {
    const fetchOfferPosts = async () => {
      try {
        const res = await fetch("/api/post/get?offer=true&limit=3");
        const data = await res.json();
        setOfferPosts(data);
        fetchRentPosts();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentPosts = async () => {
      try {
        const res = await fetch("/api/post/get?type=rent&limit=3");
        const data = await res.json();
        setRentPosts(data);
        fetchSalePosts();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSalePosts = async () => {
      try {
        const res = await fetch("/api/post/get?type=sale&limit=3");
        const data = await res.json();
        setSalePosts(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferPosts();
  }, []);
  return (
    <div>
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
