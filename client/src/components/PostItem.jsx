import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function postItem({ post }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/post/${post._id}`}>
        <img
          src={
            post.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="post cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {post.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {post.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {post.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold ">
            Rs.
            {post.offer
              ? post.discountPrice.toLocaleString("en-US")
              : post.regularPrice.toLocaleString("en-US")}
            {post.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {post.bedrooms > 1
                ? `${post.bedrooms} beds `
                : `${post.bedrooms} bed `}
            </div>
            <div className="font-bold text-xs">
              {post.bathrooms > 1
                ? `${post.bathrooms} baths `
                : `${post.bathrooms} bath `}
            </div>
            <div className="font-bold text-xs">
              {post.area > 1 ? `${post.area} sq. ft ` : `${post.area}  sq.ft `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
