import React, { useEffect, useState } from "react";
import banner2 from "~/assets/images/nft/nft6.png";
import user from "~/assets/images/nft/user.png";
import { connect } from "react-redux";
import { StateProps } from "~/utils";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaFacebookF, FaYoutube, FaTwitter, FaTelegramPlane  } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import "./Profile.css";
import { TabBox } from "~/components";
import Profile_Bids from "../Profile_Bids";
import Profile_Created from "../Profile_Created";
const bannerStyle = {
  backgroundPosition: "50%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  background:
    "linear-gradient(180deg, rgba(162, 89, 255, 0.00) 59.67%, #A259FF 100%)",
};

function Profile(props: StateProps) {
  let { navHeight } = props;
  const [bannerZone, setBannerZone] = useState(665);

  useEffect(() => {
    const handleResize = () => {
      if (navHeight) setBannerZone(window.innerHeight - navHeight);
    };

    handleResize(); // Gọi handleResize ban đầu để cập nhật bannerZone
    console.log(bannerZone);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navHeight]);

  return (
    <div>
      <div
        id="profile-banner"
        style={{ height: `${bannerZone *60/100}px` }}
        className={`relative`}
      >
        <img
          src={banner2}
          className="w-full h-full object-cover object-center relative"
        />
        <div className="absolute inset-0 bg-fog-3"></div>
        <div className="absolute inset-0 " style={bannerStyle}></div>
      </div>
      <div className=" bg-purple-3 relative">
        <div id="area-profile" className="absolute inset-0"></div>
        <div
          id="profile-pre"
          style={{ height: `${bannerZone*40/100}px` }}
          className="container max-w-7xl relative flex justify-between"
        >
          <div className="w-8/12">
            <div className="flex">
              <div
                id="profile-avatar"
                className="h-52 w-52 rounded-full overflow-hidden border-2"
                style={{ marginTop: "-6.5rem" }}
              >
                <img
                  src={user}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div
                id="profile-wallet-address"
                className="flex text-xl mt-3 ms-5"
              >
                Ox465d53...9df5&nbsp;&nbsp;
                <FaRegCopy size={"1.1em"} />
              </div>
            </div>
            <p id="profile-desc" className="text-justify my-6">
              Tincidunt intellegam mel ne, an eam menandri invenire euripidis.
              Ea quo utroque forensibus eloquentiam. Nam ad option iisque
              verterem, sed nemore menandri ex. Pri ei solet eripuit, et nam
              decore tacimates persequeris. Te nec duis corpora persequeris, vix
              ubique graece intellegat ea.
            </p>
            <span
              className="cursor-pointer"
              style={{ color: "rgba(0, 255, 117, 0.50)" }}
            >
              Read More
            </span>
          </div>
          <div className="w-2/12 text-right mt-3">
            <div id="nft-follow" className="flex justify-end">
              <div id="nft-view" className="flex items-center me-4">
                <span style={{ color: "rgba(0, 255, 117, 0.50)" }} className="text-xl">
                  1231&nbsp;
                </span>
                <MdOutlineRemoveRedEye size="1.5em" />
              </div>
              <div id="nft-like" className="flex items-center">
                <span style={{ color: "rgba(0, 255, 117, 0.50)" }} className="text-xl">
                  1231&nbsp;
                </span>
                <FaRegHeart size="1.2em" />
              </div>
            </div>
            <ul className="flex justify-between items-center my-6">
                <li className="border border-white p-2 rounded-lg bg-fog-1 me-3">
                  <FaFacebookF size={"1.5rem"} color="white" />
                </li>
                <li className="border border-white p-2 rounded-lg bg-fog-1 me-3">
                  <FaYoutube size={"1.5rem"} color="white" />
                </li>
                <li className="border border-white p-2 rounded-lg bg-fog-1 me-3">
                  <FaTwitter size={"1.5rem"} color="white" />
                </li>
                <li className="border border-white p-2 rounded-lg bg-fog-1">
                  <FaTelegramPlane size={"1.5rem"} color="white" />
                </li>
              </ul>
              <button className="w-full rounded-lg bg-fog-1 py-1.5 border border-fog-2">Follow</button>
          </div>
        </div>
      </div>
      <TabBox className="py-12" lstLabel={["Bids","Selling","Created", "Follower", "Following"]} lstComponent={[<Profile_Bids/>, <Profile_Bids/>,<Profile_Created />]}/>
    </div>
  );
}

const mapStateToProps = (state: StateProps) => ({
  navHeight: state.navHeight,
});
export default connect(mapStateToProps)(Profile);
