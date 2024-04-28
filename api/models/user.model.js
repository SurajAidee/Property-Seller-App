import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.bing.com/images/search?view=detailV2&ccid=GKAbRpYz&id=FB4A20D97D238A1F254AE8562838C515BBD26AAF&thid=OIP.GKAbRpYzDlJa139WC8xPtwHaIC&mediaurl=https%3a%2f%2fstatic.vecteezy.com%2fsystem%2fresources%2fpreviews%2f009%2f398%2f577%2foriginal%2fman-avatar-clipart-illustration-free-png.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.18a01b4696330e525ad77f560bcc4fb7%3frik%3dr2rSuxXFOChW6A%26pid%3dImgRaw%26r%3d0&exph=1920&expw=1768&q=Human+Avatar&simid=608041333942605812&FORM=IRPRST&ck=F925AFC67FAF66812F086F76B11382B3&selectedIndex=0&itb=1&ajaxhist=0&ajaxserp=0",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
