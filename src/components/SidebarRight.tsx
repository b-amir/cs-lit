import { Footer } from "./Footer";
import { TbStarFilled } from "react-icons/tb";
import { MdAccessTimeFilled } from "react-icons/md";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { UserSection } from "./UserSection";
import { VscTriangleRight } from "react-icons/vsc";
import { api } from "@/utils/api";
import Link from "next/link";
import { useWindowSize } from "@/hooks/useWindowSize";
import { animated, useSpring } from "@react-spring/web";
import { archivo } from "../styles/customFonts";

export function SidebarRight(props: { username: any }) {
  const [userSectionShown, setUserSectionShown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const { data: AnalogiesData } = api.analogy.getAll.useQuery();
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
    <>
      {showSidebar && (
        <aside
          id="logo-sidebar"
          className="fixed right-0 top-0 z-50 flex h-screen w-1/6 -translate-x-full flex-col place-content-stretch items-stretch justify-between border-l border-white bg-white pt-0 shadow-md transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="bg-whitepb-0 overflow-y-auto dark:bg-gray-800">
            <UserSection
              {...props}
              userSectionShown={userSectionShown}
              setUserSectionShown={setUserSectionShown}
            />
            <ul className="mt-6 space-y-2  text-sm  font-medium ">
              <SidebarRightWidget
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
                  {AnalogiesData?.map((analogy: any) => (
                    <li key={analogy.id}>
                      <Link
                        href={`/${analogy.category}/${analogy.topic}/${analogy.id}`}
                      >
                        <span
                          className={`ml-0 flex w-full flex-col items-center whitespace-nowrap rounded-sm ${
                            AnalogiesData &&
                            analogy === AnalogiesData[AnalogiesData.length - 1]
                              ? "border-0  border-[#eee]"
                              : "border-b border-[#eee]"
                          } px-3 py-2.5 pl-6  pt-3 text-xs font-normal  hover:bg-[#efefef84]`}
                        >
                          <span className="mb-1 self-start font-semibold text-gray-700">
                            {analogy.topic.title}
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
                  ))}
                </ul>
              </SidebarRightWidget>

              <SidebarRightWidget
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
                    {user._count.analogies !== 0 && (
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
                              {user.name ? user.name : user.email}
                            </span>
                            <span className="self-start text-xs font-light text-gray-500">
                              {user._count.analogies}{" "}
                              {user._count.analogies === 1
                                ? "analogy"
                                : "analogies"}
                            </span>
                          </span>
                        </Link>
                      </li>
                    )}
                  </>
                ))}
              </SidebarRightWidget>
            </ul>
          </div>
          <Footer />
        </aside>
      )}
    </>
  );
}

export function SidebarRightWidget(props: PropsWithChildren<any>) {
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
    <li className="mx-auto mb-6 flex h-full w-[100%] flex-col overflow-hidden rounded-[0px] border-y bg-[#F9F9F9] pb-0 shadow-sm ">
      <div
        onClick={props.onShow}
        id="sidebar-widget-title"
        className="group mx-4 my-4 inline-flex max-w-[180px] flex-1 cursor-pointer select-none items-center overflow-clip overflow-ellipsis  whitespace-nowrap rounded-[12px] border bg-[#ffffff] px-3 py-2 text-sm text-[#555558] shadow-sm transition-all hover:border-[#00000037] hover:bg-[#f7f7f7] hover:shadow-inner hover:shadow-[#ebebebb7] dark:text-white"
      >
        <span id="widget-icon" className="mr-2 ">
          {props.widgetIcon}
        </span>
        <span
          className={`${archivo.className}  mr-1 whitespace-nowrap  pr-1.5 font-bold tracking-tight`}
          // className=" mr-1 whitespace-nowrap  pr-1.5 font-archivo font-bold tracking-tight"
        >
          {props.widgetTitle}
        </span>
        <span
          className={` text-xs text-[#9f9f9f] transition-transform ${
            props.isActive
              ? "rotate-90"
              : "transition-all delay-200 duration-300 group-hover:rotate-[45deg]"
          }`}
        >
          <VscTriangleRight />
        </span>
      </div>

      {/* {props.isActive && ( */}
      <animated.div
        id="sidebar-widget-body"
        className="mb-0"
        style={animationProps}
        ref={contentRef}
      >
        {props.children}
      </animated.div>
      {/* )} */}
    </li>
  );
}
