import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import CommentSection from "../components/CommentSection";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { BiSolidArea } from "react-icons/bi";
import Contact from "../components/Contact";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Post() {
  SwiperCore.use([Navigation]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // let id = params.postId;
        // id = id.slice(0, -1);
        // console.log(id);

        const res = await fetch(`/api/post/get/${params.postId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.postId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {post && !loading && !error && (
        <div>
          <Swiper navigation>
            {post.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {post.name} - Rs{" "}
              {post.offer
                ? post.discountPrice.toLocaleString("en-US")
                : post.regularPrice.toLocaleString("en-US")}
              {post.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-4 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700 dark:text-green-500" />
              <div className="dark:text-green-500">{post.address}</div>
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {post.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {post.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  Rs{+post.regularPrice - +post.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800 dark:text-white">
              <span className="font-semibold text-black dark:text-white">
                Description -{" "}
              </span>
              {post.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap dark:text-green-500">
                <FaBed className="text-lg" />
                {post.bedrooms > 1
                  ? `${post.bedrooms} beds `
                  : `${post.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap dark:text-green-500">
                <FaBath className="text-lg" />
                {post.bathrooms > 1
                  ? `${post.bathrooms} baths `
                  : `${post.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap dark:text-green-500">
                <BiSolidArea className="text-lg" />
                {post.area > 1
                  ? `${post.area} sq. ft `
                  : `${post.area} sq. ft `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap dark:text-green-500">
                <FaParking className="text-lg" />
                {post.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap dark:text-green-500">
                <FaChair className="text-lg" />
                {post.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && post.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact post={post} />}
            <CommentSection postId={post._id} />
          </div>
        </div>
      )}
    </main>
  );
}
