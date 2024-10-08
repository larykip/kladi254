import AdminDashboard from "@/components/admin/AdminDashboard";
import BrandsLogo from "@/components/BrandsLogo";
import ItemComponent from "@/components/ItemComponent";
import Join from "@/components/authentication/Join";
import Navbar from "@/components/Navbar";
import Preview from "@/components/Preview";
import VideoComponent from "@/components/VideoComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <Preview/>
      {/* <ItemComponent/> */}
      <VideoComponent/>
      <BrandsLogo/>
    </div>
  );
}
