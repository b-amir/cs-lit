import { TbStarFilled } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { UserSection } from "../UserSection";
import { api } from "@/utils/api";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize";
import { animated, useSpring } from "@react-spring/web";
import { archivo } from "../../styles/customFonts";
import { IoIosArrowUp } from "react-icons/io";
import { routeHandler } from "@/utils/routeHandler";
import { useSession } from "next-auth/react";
import { AiFillControl } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

export function SidebarRight({ visible, hide }) {
  const [userSectionShown, setUserSectionShown] = useState(false);
  const { data: sessionData } = useSession();
  const username = sessionData?.user;

  return (
    <div className="flex ">
      <aside
        id="sidebar-right"
        className={`fixed right-0 top-0 z-50 flex h-screen w-9/12 flex-col place-content-stretch items-stretch justify-between border-l
      border-white bg-white pt-0 shadow-md transition-transform  dark:border-gray-700 dark:bg-gray-800 sm:w-1/6 ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
        aria-label="Sidebar"
      >
        <div className="overflow-y-auto bg-white pb-0 dark:bg-gray-800">
          <UserSection
            username={username}
            userSectionShown={userSectionShown}
            setUserSectionShown={setUserSectionShown}
          />
          <WidgetSection />
        </div>
        {["ADMIN", "EDITOR"].includes(sessionData?.user.role) && <AdminLink />}
      </aside>

      {visible && (
        <div
          className="fixed right-0 top-0 z-[49] h-screen w-screen  overscroll-y-none bg-[#0000003c] backdrop-blur-md sm:hidden"
          onClick={hide}
        >
          <IoClose
            className="absolute left-6 top-6 h-10 w-10 cursor-pointer p-[0.4rem] text-[#4f4e4d97] hover:text-[#4f4e4dee]"
            onClick={(e) => {
              e.preventDefault();
              hide;
            }}
          />
        </div>
      )}
    </div>
  );
}

function WidgetSection() {
  const { data: AnalogiesData } = api.analogy.getAll.useInfiniteQuery(
    { limit: 5, order: "desc" },
    {}
  );
  const { data: TopThreeData } = api.profile.getTopThree.useQuery();

  // if window height is small, show one widget at a time and hide the other
  const [activeWidgetIndex, setActiveWidgetIndex] = useState([0]);
  const size = useWindowSize();
  useEffect(() => {
    if (size?.height && size?.height > 830) {
      setActiveWidgetIndex([0, 1]);
    }
  }, [size]);

  return (
    <ul className="mt-6 space-y-2  text-sm  font-medium ">
      <WidgetLayout
        AnalogiesData={AnalogiesData}
        widgetTitle="Recent Analogies"
        widgetIcon={<MdAccessTimeFilled />}
        onShow={
          // if activeWidgetIndex.includes 0 and 1 then setActiveWidgetIndex to 1
          // else setActiveWidgetIndex to 0
          // because in big screens when both are active the expected behavior is to collapse on click
          () => {
            if (activeWidgetIndex.includes(0)) {
              setActiveWidgetIndex([1]);
            } else {
              setActiveWidgetIndex([0]);
            }
          }
        }
        isActive={activeWidgetIndex.includes(0)}
      >
        <ul className="group">
          {AnalogiesData?.pages?.map((page) =>
            page?.items?.map((analogy: any) => (
              // {AnalogiesData?.map((analogy: any) => (
              <li key={analogy.id}>
                <Link
                  // href={`/${analogy.category}/${analogy.topic}/${analogy.id}`}
                  href={`${routeHandler(analogy, "Analogies")}`}
                >
                  <span
                    className={`ml-0 flex w-full flex-col items-center whitespace-nowrap rounded-sm ${
                      AnalogiesData &&
                      analogy === AnalogiesData[AnalogiesData.length - 1]
                        ? "border-0  border-[#eee]"
                        : "border-b border-[#eee]"
                    } px-3 py-2.5 pl-6  pt-3 text-xs font-normal  hover:bg-[#efefef84]`}
                  >
                    <span className="mb-1 w-11/12 self-start overflow-clip overflow-ellipsis whitespace-nowrap font-semibold text-gray-700">
                      {analogy.topic?.title}
                    </span>
                    <span className="self-start text-xs font-light text-gray-500">
                      by{" "}
                      {analogy.user.name
                        ? analogy.user.name
                        : analogy.user.email}
                    </span>
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </WidgetLayout>

      <WidgetLayout
        AnalogiesData={AnalogiesData}
        widgetTitle="Top Contributors"
        widgetIcon={<TbStarFilled />}
        onShow={() => {
          if (activeWidgetIndex.includes(1)) {
            setActiveWidgetIndex([0]);
          } else {
            setActiveWidgetIndex([1]);
          }
        }}
        isActive={activeWidgetIndex.includes(1)}
      >
        {TopThreeData?.map((user: any) => (
          <>
            {/* as long as user._count.analogies is not 0 */}
            {user.analogiesCount !== 0 && (
              <li key={user.id}>
                <Link href={`/profile/${user.id}`}>
                  <span
                    className={`ml-0 flex w-full flex-col items-center whitespace-nowrap rounded-sm ${
                      TopThreeData &&
                      user === TopThreeData[TopThreeData.length - 1]
                        ? "border-0  border-[#eee]"
                        : "border-b border-[#eee]"
                    } px-3 py-2.5 pl-6  pt-3 text-xs font-normal  hover:bg-[#efefef84]`}
                  >
                    <span className="mb-1 self-start font-semibold text-gray-700">
                      {user.name ? user.name : "unknown"}
                    </span>
                    <span className="self-start text-xs font-light text-gray-500">
                      {user.analogiesCount}{" "}
                      {user.analogiesCount === 1 ? "analogy" : "analogies"}
                    </span>
                  </span>
                </Link>
              </li>
            )}
          </>
        ))}
      </WidgetLayout>
    </ul>
  );
}
export function WidgetLayout(props: PropsWithChildren<any>) {
  const contentRef = useRef(null);
  const animationProps = useSpring({
    height: !props.isActive ? 0 : contentRef.current?.scrollHeight || "auto",
    opacity: !props.isActive ? 0 : 1,
    visibility: !props.isActive ? "hidden" : "visible",
    // smooth slide up/down animation. no bouncing
    delay: !props.isActive ? 0 : 400,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <li className="mx-auto mb-6 flex h-full w-[100%] flex-col overflow-hidden rounded-[0px] border-y bg-[#F9F9F9] pb-0 ">
      <div
        onClick={props.onShow}
        id="sidebar-widget-title"
        className="group mx-4 my-4 inline-flex max-w-[180px] flex-1 cursor-pointer select-none items-center overflow-clip overflow-ellipsis  whitespace-nowrap rounded-[12px] border bg-[#ffffff] px-3 py-2 text-sm text-[#555558] shadow-sm transition-all hover:border-[#00000037] hover:bg-[#f7f7f7] hover:shadow-inner hover:shadow-[#ebebebb7] dark:text-white"
      >
        <span id="widget-icon" className="mr-2 ">
          {props.widgetIcon}
        </span>
        <span
          className={`${archivo.className}  mr-1 whitespace-nowrap  pr-1 font-bold tracking-tight`}
          // className=" mr-1 whitespace-nowrap  pr-1.5 font-archivo font-bold tracking-tight"
        >
          {props.widgetTitle}
        </span>
        <span
          className={` text-xs text-[#9f9f9f] transition-transform ${
            props.isActive
              ? "rotate-180"
              : "transition-all delay-200 duration-300 group-hover:rotate-[90deg]"
          }`}
        >
          <IoIosArrowUp />
        </span>
      </div>

      {/* {props.isActive && ( */}
      <animated.div
        id="sidebar-widget-body"
        className="mb-0 "
        style={animationProps}
        ref={contentRef}
      >
        {props.children}
      </animated.div>
      {/* )} */}
    </li>
  );
}
function AdminLink() {
  return (
    <Link
      href="/admin"
      className=" mx-4 mb-4 flex items-center space-y-2 overflow-x-clip 
            truncate text-ellipsis whitespace-nowrap rounded-lg p-2 px-3 text-sm font-medium text-[#2A2A2E] hover:bg-gray-100"
    >
      <AiFillControl className="mb-0.5 mr-2 scale-125" /> Admin panel
    </Link>
  );
}
