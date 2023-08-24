import { useEffect, type PropsWithChildren, useRef, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";
import { archivo } from "../../styles/customFonts";
import { routeHandler } from "@/utils/routeHandler";
import { useWindowSize } from "@/hooks/useWindowSize";
import { animated, useSpring } from "@react-spring/web";
import { TbStarFilled as Star } from "react-icons/tb";
import { IoIosArrowUp as ArrowUp } from "react-icons/io";
import { MdAccessTimeFilled as Clock } from "react-icons/md";
import {
  type ExtendedAnalogy,
  type CONTRIBUTOR,
  type ISingleWidgetProps,
  type IWidgetLayoutProps,
  type IWidgetsSectionProps,
} from "./types";

export function WidgetsSection({ hide }: IWidgetsSectionProps) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  // if window height is small, show one widget at a time and hide the other
  const [activeWidgetIndex, setActiveWidgetIndex] = useState<number[]>([0]);
  useEffect(() => {
    if (windowHeight && windowHeight > 830) {
      setActiveWidgetIndex([0, 1]);
    }
  }, [windowHeight]);

  return (
    <ul className="mt-6 space-y-2 text-sm font-medium ">
      <RecentAnalogiesWidget
        activeWidgetIndex={activeWidgetIndex}
        hide={hide}
        windowWidth={windowWidth}
        setActiveWidgetIndex={setActiveWidgetIndex}
      />

      <TopContributorsWidget
        activeWidgetIndex={activeWidgetIndex}
        hide={hide}
        windowWidth={windowWidth}
        setActiveWidgetIndex={setActiveWidgetIndex}
      />
    </ul>
  );
}

export function WidgetLayout(props: PropsWithChildren<IWidgetLayoutProps>) {
  // animation settings
  const contentRef = useRef<HTMLDivElement>(null);
  const animationProps = useSpring({
    height: props.isActive ? contentRef.current?.scrollHeight || "auto" : 0,
    opacity: props.isActive ? 1 : 0,
    visibility: props.isActive ? "visible" : "hidden",
    delay: props.isActive ? 400 : 0,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <li className="mx-auto mb-6 flex h-full w-[100%] flex-col overflow-hidden rounded-[0px] border-y bg-[#F9F9F9] pb-0 ">
      <div
        onClick={props.onShow}
        id="sidebar-widget-title"
        className="group mx-4 my-4 inline-flex max-w-[180px] flex-1 cursor-pointer select-none items-center overflow-clip overflow-ellipsis whitespace-nowrap rounded-[12px] border bg-[#ffffff] px-3 py-2 text-sm text-[#555558] shadow-sm transition-all hover:border-[#00000037] hover:bg-[#f7f7f7] hover:shadow-inner hover:shadow-[#ebebebb7]"
      >
        <span id="widget-icon" className="mr-2 ">
          {props.widgetIcon}
        </span>
        <span
          className={`${archivo.className} mr-1 whitespace-nowrap pr-1 font-bold tracking-tight`}
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
          <ArrowUp />
        </span>
      </div>

      <animated.div
        id="sidebar-widget-body"
        className="mb-0 "
        style={animationProps}
        ref={contentRef}
      >
        {props.children}
      </animated.div>
    </li>
  );
}

export function RecentAnalogiesWidget({
  activeWidgetIndex,
  hide,
  windowWidth,
  setActiveWidgetIndex,
}: ISingleWidgetProps) {
  const { data: AnalogiesData } = api.analogy.getAll.useInfiniteQuery(
    { limit: 5, order: "desc" },
    {}
  );
  return (
    <WidgetLayout
      widgetTitle="Recent Analogies"
      widgetIcon={<Clock />}
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
          page?.items?.map((analogy: ExtendedAnalogy) => (
            <li key={analogy.id}>
              <Link
                href={`${routeHandler(analogy, "Analogies") ?? ""}`}
                onClick={() => {
                  // only hide after click for mobile
                  if (windowWidth && windowWidth < 640) hide;
                }}
              >
                <span
                  className={`ml-0 flex w-full flex-col items-center whitespace-nowrap rounded-sm px-3 py-2.5 pl-6 pt-3 text-xs font-normal hover:bg-[#efefef84] ${
                    AnalogiesData &&
                    analogy === AnalogiesData[AnalogiesData.length - 1]
                      ? "border-0 border-[#eee]"
                      : "border-b border-[#eee]"
                  }`}
                >
                  <span className="mb-1 w-11/12 self-start overflow-clip overflow-ellipsis whitespace-nowrap font-semibold text-gray-700">
                    {analogy.topic?.title}
                  </span>
                  <span className="self-start text-xs font-light text-gray-500">
                    by{" "}
                    {analogy.user?.name
                      ? analogy.user?.name
                      : analogy.user?.email}
                  </span>
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </WidgetLayout>
  );
}

export function TopContributorsWidget({
  activeWidgetIndex,
  hide,
  windowWidth,
  setActiveWidgetIndex,
}: ISingleWidgetProps) {
  const { data: TopThreeData } = api.profile.getTopThree.useQuery();

  return (
    <WidgetLayout
      widgetTitle="Top Contributors"
      widgetIcon={<Star />}
      onShow={() => {
        if (activeWidgetIndex.includes(1)) {
          setActiveWidgetIndex([0]);
        } else {
          setActiveWidgetIndex([1]);
        }
      }}
      isActive={activeWidgetIndex.includes(1)}
    >
      {TopThreeData?.map((contributor: CONTRIBUTOR) => (
        <>
          {contributor.analogiesCount !== 0 && (
            <li key={contributor.id}>
              <Link
                href={`/profile/${contributor.id}`}
                onClick={() => {
                  // only hide after click for mobile
                  if (windowWidth && windowWidth < 640) hide;
                }}
              >
                <span
                  className={`ml-0 flex w-full flex-col items-center whitespace-nowrap rounded-sm px-3 py-2.5 pl-6 pt-3 text-xs font-normal hover:bg-[#efefef84] ${
                    TopThreeData &&
                    contributor === TopThreeData[TopThreeData.length - 1]
                      ? "border-0 border-[#eee]"
                      : "border-b border-[#eee]"
                  }`}
                >
                  <span className="mb-1 self-start font-semibold text-gray-700">
                    {contributor.name ? contributor.name : "unknown"}
                  </span>
                  <span className="self-start text-xs font-light text-gray-500">
                    {contributor.analogiesCount}{" "}
                    {contributor.analogiesCount === 1 ? "analogy" : "analogies"}
                  </span>
                </span>
              </Link>
            </li>
          )}
        </>
      ))}
    </WidgetLayout>
  );
}
