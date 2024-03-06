import React from "react";
import img404 from "~/assets/images/layout/404_3.png";
import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAppDispatch } from "~/utils/store/store";
import { handle404 } from "~/utils/store/features/uiSlice";
export default function NotFound() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="bg-purple-3 h-screen overflow-hidden relative">
      <div className="h-4/5">
        <img src={img404} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="flex justify-center" style={{ marginTop: "-8rem" }}>
        <button
          onClick={() => {navigate(-1);dispatch(handle404({isNotFound:false}))}}
          className="font-semibold text-xl rounded-lg
           bg-fog-1 px-6 py-2 border border-fog-2
           hover:bg-purple-3 me-3 flex items-center"
           title="Go back"
        >
            <IoMdArrowRoundBack />

        </button>
        <button
          onClick={() => {navigate('/Home');dispatch(handle404({isNotFound:false}))}}
          className="font-semibold text-xl rounded-lg
           bg-fog-1 px-6 py-2 border border-fog-2
           hover:bg-purple-3 flex items-center "
           title="Home"
        >
            <IoHomeOutline/>

        </button>
      </div>
    </div>
  );
}
