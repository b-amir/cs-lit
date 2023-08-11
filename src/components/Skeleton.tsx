import React from "react";

export function MultilineSkeleton(): React.ReactNode {
  return (
    <>
      <div className="my-1 flex h-4 w-8/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-1 flex h-4 w-6/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-1 flex h-4 w-5/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
    </>
  );
}
export function SmallSkeleton(): React.ReactNode {
  return (
    <div className="my-1 flex h-4 w-16 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
  );
}
export function MediumSkeleton(): React.ReactNode {
  return (
    <div className="my-1 flex h-4 w-28 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
  );
}
export function AvatarSkeleton(): React.ReactNode {
  return (
    <div className="ml-1 mr-4 h-8 w-8 animate-pulse rounded-full bg-gray-200 ring-[3px]  ring-[#b2b2b232]" />
  );
}
export function HomeCategorySkeleton() {
  return (
    <div className="grid h-4/6 w-full grid-cols-3 grid-rows-5 gap-6">
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
      <div className="flex h-[85.65px] w-[283.65px] animate-pulse flex-row items-center justify-center rounded-xl bg-[#6267774f] px-6 py-7 shadow-sm backdrop-blur-sm" />
    </div>
  );
}
export function HomeUserSkeleton() {
  return (
    <div className="flex h-[47.66px] w-[148.53px] animate-pulse items-center gap-2 rounded-full border border-[#5c2c1d2b] bg-[#f0cec5] px-2 py-2 pr-4 backdrop-blur-sm transition-all duration-300" />
  );
}
export function TableSkeleton(): React.ReactNode {
  return (
    <div
      id="table-skeleton"
      className="flex h-3/5 w-full animate-pulse  flex-col items-start justify-start gap-4 rounded-[12px]  border border-[#cdcdcd7d] bg-gray-50 px-6 pb-10 pt-12 shadow-sm "
    >
      <div className="my-0.5 flex h-4 w-8/12 animate-pulse justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-0.5 flex h-4 w-6/12 animate-pulse justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-0.5 flex h-4 w-5/12 animate-pulse  justify-between rounded-md  bg-gray-200 align-middle" />
    </div>
  );
}
export function SidebarCategorySkeleton() {
  return (
    <div className="mb-auto mt-8  px-3">
      <div className="my-4 flex h-6 w-9/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-4 flex h-6 w-6/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-4 flex h-6 w-5/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-4 flex h-6 w-6/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-4 flex h-6 w-8/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
      <div className="my-4 flex h-6 w-7/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" />
    </div>
  );
}

export function AnalogySkeleton() {
  return (
    <div className="mx-auto my-7 flex w-full    flex-row justify-between px-16 py-1 align-middle text-sm text-[#808080]">
      <div
        className="mx-auto flex h-56 w-full  max-w-[705px] animate-pulse flex-col items-start justify-start 
    rounded-[17px] border border-[#cdcdcd7d] bg-gray-50  pb-5 shadow-sm "
      >
        <div className="mb-0.5 flex h-14 w-full animate-pulse justify-between rounded-t-[17px]  border-b bg-gray-100 align-middle" />
        {/* <div className="mx-4 my-0.5 flex h-4 w-6/12 animate-pulse justify-between rounded-md  bg-gray-200 align-middle" />
        <div className="mx-4 my-0.5 flex h-4 w-5/12 animate-pulse  justify-between rounded-md  bg-gray-200 align-middle" />
        <div className="mx-4 my-0.5  flex h-4 w-5/12 animate-pulse items-center justify-between rounded-md  bg-gray-200 align-middle" /> */}
      </div>
    </div>
  );
}

export function CommentSkeleton() {
  return (
    <div className="mb-3 animate-pulse rounded-lg bg-[#f0f0f0]  px-3 py-3   ">
      <div className="flex">
        <div className="mb-3 mr-2 h-3 w-3 animate-pulse rounded-lg  bg-[#dddddd] px-2 py-2  " />
        <div className="mb-3 h-3 w-1/6 animate-pulse rounded-lg  bg-[#dddddd] px-2 py-2  " />{" "}
      </div>
      <div className="mb-3 h-3 w-11/12 animate-pulse rounded-lg  bg-[#dddddd] px-2 py-2  " />
    </div>
  );
}

export function UserSkeleton() {
  return (
    <div className="flex w-full ">
      <div className="my-auto  mr-2 h-10 w-10 animate-pulse rounded-full  bg-[#D9D9D9] px-2  " />
      <div className="my-auto flex flex-col items-start justify-center">
        <div className="my-1 h-3 w-24 animate-pulse rounded-lg  bg-[#dddddd] px-2 py-2  " />
        <div className="my-1 h-2 w-16 animate-pulse rounded-lg  bg-[#dddddd] px-2 py-2  " />
      </div>
    </div>
  );
}
