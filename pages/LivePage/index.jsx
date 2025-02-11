import { useSelector } from "react-redux";

import { LivePageStyle } from "./LivePageStyle";
import { MainSlider } from "../PagesManagement/components";
import SubCategory from "components/page customize/SubCategory";

const LivePage = () => {
  const menus = useSelector((state) => state.menus);
  const liveObj = menus.find(({ link }) => link?.includes('live'));

  return (
    <LivePageStyle>
      <span className="pageTitle">مدیریت  رویداد</span>

      <MainSlider menuId={liveObj?.id} isLivePage />

      <SubCategory menuId={liveObj?.id} />
    </LivePageStyle>
  );
};

export default LivePage;
