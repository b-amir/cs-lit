import { PageLayout } from "@/components/layout";
import { useRouter } from "next/router";
import { CgFolderAdd } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import React, { useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { api } from "@/utils/api";
import { CornerLoading } from "@/components/loading";
import Link from "next/link";
import slugify from "slugify";
import { toast } from "react-hot-toast";
import { FaGhost } from "react-icons/fa";
import Head from "next/head";
import { archivo } from "@/styles/customFonts";
import { addActivityLog } from "@/utils/addActivityLog";
import { AiFillLock } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { TableSkeleton } from "@/components/Skeleton";
import { getStatusIcon } from "@/utils/getStatusIcon";

// import { deleteTopicHandler } from "@/utils/deleteActions";

function CategoryPage(props) {
  const router = useRouter();
  const UrlCategory = router.query.category as string;

  const { data: sessionData, status } = useSession();

  const [input, setInput] = useState<ITopicInput>({
    id: "",
    title: "",
    linkToDocs: "",
    category: "",
    firstAnalogy: "",
  });

  // const [addTopicShown, setAddTopicShown] = useState(false);
  const [topicEditor, setTopicEditor] = useState({
    shown: false,
    porpuse: null as null | "edit" | "create",
  });

  const contentRef = useRef(null);
  const animationProps = useSpring({
    height: !topicEditor.shown ? 0 : sessionData ? 620 : 150,
    config: {
      tension: 200,
      friction: 30,
    },
  });

  const {
    data: categoryData,
    isFetching: categoryFetching,
    status: categoryFetchingStatus,
  } = api.category.getBySlug.useQuery({
    slug: UrlCategory,
  });

  const { data: topicsData, status: topicsFetchingStatus } =
    api.topic.getByCategoryId.useQuery({
      id: categoryData?.id as string,
    });

  const topicEditHandler = (topicId: string) => {
    // open NewTopicForm with the selected topic values as default to be changed and saved again
    const topicToEdit = topicsData?.find((topic) => topic.id === topicId);

    setInput({
      id: topicToEdit?.id || "",
      title: topicToEdit?.title || "",
      linkToDocs: topicToEdit?.url || "",
      category: topicToEdit?.categoryId || "",
      firstAnalogy: "" || "",
    });

    // setAddTopicShown(true);
    setTopicEditor({
      shown: true,
      porpuse: "edit",
    });
  };

  // if (categoryFetching) return <LoadingPage />;
  if (!categoryFetching && !categoryData) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <Head>
        <title>{`${categoryData?.name ?? "CS"}`} Like I&apos;m 10!</title>
        <meta
          name="description"
          content="Explain Computer science like I'm 10 Years Old!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {/*  ----------------------------------------
                            MAIN TOPICS
              ----------------------------------------  */}
        <div
          className={`grow-1 w-full pt-[90px] [overflow:overlay] ${
            topicsData && topicsData.length > 5
              ? " min-h-[calc(100dvh-0px)]"
              : " min-h-[calc(100dvh-160px)]"
          }`}
        >
          {/*  ------------------
                      header
                ------------------  */}
          <div className="mx-auto mb-0  mt-10 flex flex-col justify-between px-16 ">
            {categoryFetchingStatus === "loading" ? (
              <div className=" mb-4  h-8 w-1/4 animate-pulse rounded-lg bg-[#b4b4b49f]" />
            ) : (
              <h1
                className={`${archivo.className} mb-4 items-start justify-start  text-5xl font-extrabold  tracking-tight text-[#2A2A2E] sm:text-[2rem]`}
              >
                {categoryData?.name}
              </h1>
            )}
            <div className="flex flex-row items-end place-self-end pt-5 text-sm font-semibold text-[#2A2A2E]">
              <div className="mr-0 inline-flex items-center">
                <label htmlFor="sort-by" className="min-w-fit">
                  Sort by:
                </label>
                <select
                  style={{
                    paddingLeft: "0.8rem",
                    paddingRight: "1.5rem",
                    paddingTop: "0.35rem",
                    paddingBottom: "0.35rem",
                    backgroundColor: "#fff",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%234a5568'%3E%3Cpath fill-rule='evenodd' d='M10.707 14.707a1 1 0 0 1-1.414 0L5.586 10.586a1 1 0 1 1 1.414-1.414L10 12.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat, no-repeat, no-repeat",
                    backgroundPosition:
                      "right 0.5em top 50%, right 1.5em top 50%, 0 0",
                    backgroundSize: "0.65em auto, 1.5em auto, 100% 100%",
                    transition: "all 0.2s ease-in-out",
                    outline: "none",
                  }}
                  id="sort-by"
                  name="sort-by"
                  // className="bg-gray-50 border border-gray-300 text-[#2A2A2E] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  className="mx-2 inline-flex cursor-pointer appearance-none flex-row items-end rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
                >
                  <option>Recent</option>
                  <option>Alphabetical</option>
                </select>
              </div>
              <button
                onClick={() =>
                  setTopicEditor({
                    shown: true,
                    porpuse: "create",
                  })
                }
                className="mx-2 inline-flex flex-row items-center rounded-[12px] border border-[#d2d2d28e] bg-[#ffffffc1] px-3 py-1.5 text-sm transition-all hover:border-[#c8c8c8] hover:bg-[#ffffff]"
              >
                <CgFolderAdd className="mb-0.5 mr-2" /> Create topic
              </button>
            </div>
          </div>
          {/*  ------------------
                    topics list
                ------------------  */}
          <div className="mx-auto mb-12 mt-8 flex px-16 ">
            {/* table */}
            {categoryFetching && <CornerLoading />}
            {topicsFetchingStatus === "loading" && <TableSkeleton />}
            {topicsFetchingStatus === "success" && topicsData.length > 0 ? (
              <div className="relative w-full overflow-x-auto rounded-[12px] border  border-[#cdcdcd7d] shadow-sm">
                <table className="w-full  text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="border-b bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="w-full px-6 py-3">
                        Topic
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Status</span>
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        last update
                      </th>
                      {["ADMIN", "EDITOR"].includes(sessionData?.user.role) && (
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {topicsData?.map((topic) => (
                      <tr
                        key={topic.id}
                        className="border-b bg-white  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Link
                          href={`${UrlCategory}/${topic.slug}`}
                          className=""
                        >
                          {" "}
                          <th
                            scope="row"
                            className="max-w-[360px] cursor-pointer overflow-clip overflow-ellipsis whitespace-nowrap px-6 py-6 text-base font-medium text-[#2A2A2E] dark:text-white"
                          >
                            {topic.title}
                          </th>
                        </Link>
                        <td className="px-6 py-4">
                          {getStatusIcon(topic.status)}
                        </td>
                        <td className="px-6 py-4 text-center ">
                          {new Date(topic.updatedAt).toLocaleDateString()}
                        </td>
                        {["ADMIN", "EDITOR"].includes(
                          sessionData?.user.role
                        ) && (
                          <td className="px-6 py-4 text-right">
                            <a
                              href="#"
                              className="font-medium text-gray-400 hover:underline dark:text-gray-300"
                              onClick={() => topicEditHandler(topic.id)}
                            >
                              Edit
                            </a>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            {topicsFetchingStatus === "success" && topicsData.length <= 0 ? (
              <div className="font-merriweathersans mx-auto mt-[20%] flex h-full flex-col items-center justify-center gap-10 text-lg font-semibold text-[#8c8c8cdd]">
                <FaGhost className="text-9xl  text-[#a3a3a380]" />
                <span>
                  No topics yet.{" "}
                  <span
                    className="cursor-pointer hover:text-[#4a4a4add]"
                    onClick={() => {
                      setTopicEditor({
                        shown: !topicEditor?.shown,
                        porpuse: "create",
                      });
                    }}
                  >
                    Create one!
                  </span>
                </span>
              </div>
            ) : null}
          </div>

          {/*  ------------------
                    pagination
                ------------------  */}
        </div>

        {/* ----------------------------------------
                        CREATE NEW TOPIC
             ----------------------------------------  */}
        <div
          className={`z-30 flex w-full grow-0 flex-col items-center    px-16 text-[#2A2A2E] shadow-lg backdrop-blur-sm backdrop-filter ${
            topicEditor?.shown
              ? "sticky bottom-0 h-full max-h-[calc(100vh-90px-1px)] bg-[#2a2a2e3b]  pb-5 pt-7 shadow-[0px_-1px_6px_2px_#00000015,0px_0px_0px_1px_#00000030,0px_-11px_20px_2px_#00000005,0px_-20px_55px_0px_#00000005]"
              : "sticky bottom-[-200px] bg-[#2a2a2e3b] pb-7 pt-9"
          }`}
        >
          {/*  ------------------
                    toggle trigger
                  ------------------  */}
          <NewTopicToggleTrigger
            // addTopicShown={addTopicShown}
            // setAddTopicShown={setAddTopicShown}
            topicEditor={topicEditor}
            setTopicEditor={setTopicEditor}
            setInput={setInput}
          />

          {/*  ------------------
                       main form
                  ------------------  */}
          <animated.div
            style={animationProps}
            ref={contentRef}
            className="w-full"
          >
            {topicEditor.shown && (
              <TopicEditorForm
                UrlCategory={UrlCategory}
                data={categoryData}
                input={input}
                setInput={setInput}
                // setAddTopicShown={setAddTopicShown}
                topicEditor={topicEditor}
                setTopicEditor={setTopicEditor}
              />
            )}
          </animated.div>
        </div>
      </PageLayout>
    </>
  );
}

export default CategoryPage;

export interface ITopicEditor {
  shown: boolean;
  porpuse: null | "create" | "edit";
}

// ------------------  COMPONENTS  ------------------

function NewTopicToggleTrigger({
  // addTopicShown,
  // setAddTopicShown,
  setInput,
  topicEditor,
  setTopicEditor,
}: {
  // addTopicShown: boolean;
  // setAddTopicShown: React.Dispatch<React.SetStateAction<boolean>>;
  topicEditor?: ITopicEditor;
  setTopicEditor?: React.Dispatch<React.SetStateAction<ITopicEditor>>;
  setInput: React.Dispatch<React.SetStateAction<ITopicInput>>;
}) {
  return (
    <div
      id="add-topic-header"
      className={` mb-4 inline-flex w-full cursor-pointer flex-row items-center  rounded-[12px] border border-[#dcdcdca1] bg-[#efefef]  
      px-10 text-xl font-bold shadow-sm transition-all duration-300  hover:border-[#8b8b8ba5]  hover:bg-[#ffffff]    ${
        topicEditor?.shown ? "py-6 " : "py-6 "
      } `}
      onClick={() => {
        // setAddTopicShown(!addTopicShown);
        setTopicEditor?.({
          shown: !topicEditor?.shown,
          porpuse: "create",
        });

        setInput({
          id: "",
          title: "",
          linkToDocs: "",
          category: "",
          firstAnalogy: "",
        });
        // setTimeout(() => {
        //   window.scrollTo({
        //     top: document.getElementById("add-topic-body")?.offsetTop,
        //     behavior: "smooth",
        //   });
        // }, 300);
      }}
    >
      <CgFolderAdd className="mb-1.5 mr-2.5" />
      <span className=" grow select-none">
        <h2>
          {topicEditor?.porpuse === "edit"
            ? "Edit selected topic"
            : "Create a new topic"}
        </h2>
      </span>
      <IoClose
        className={`mb-1 transform cursor-pointer text-2xl text-[#737373] transition-transform delay-500 duration-200 hover:text-black ${
          topicEditor?.shown ? "" : "rotate-45"
        }`}
      />
    </div>
  );
}

export function TopicEditorForm({
  UrlCategory,
  data,
  input,
  setInput,
  // setAddTopicShown,
  // create or edit
  topicEditor,
  setTopicEditor,
}: {
  UrlCategory: string | undefined;
  data: any;
  input: ITopicInput;
  setAddTopicShown: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<ITopicInput>>;
  topicEditor?: ITopicEditor;
  setTopicEditor?: React.Dispatch<React.SetStateAction<ITopicEditor>>;
}) {
  const ctx = api.useContext();
  const { data: sessionData, status } = useSession();
  const topicSlug = slugify(input.title, { lower: true });

  const { mutate: createTopic, isLoading: isSubmitting } =
    api.topic.create.useMutation({
      onSuccess: () => {
        setInput({
          id: "",
          title: "",
          linkToDocs: "",
          category: "",
          firstAnalogy: "",
        });
        void ctx.topic.getByCategoryId.invalidate();
        toast.success("Topic created successfully.");

        // setAddTopicShown(false);
        setTopicEditor?.({
          shown: false,
          porpuse: null,
        });
      },
      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors;
        // console.log(errorMessage);
        if (errorMessage) {
          if (errorMessage.url) {
            toast.error(errorMessage?.url.join(" "));
          }
          if (errorMessage.title) {
            toast.error(errorMessage?.title.join(" "));
          }
          if (errorMessage.analogies) {
            toast.error(errorMessage?.analogies.join(" "));
          }
        } else {
          toast.error("Something went wrong.");
        }
      },
    });

  const { mutate: editTopic } = api.topic.update.useMutation({
    onSuccess: () => {
      setInput({
        id: "",
        title: "",
        linkToDocs: "",
        category: "",
        firstAnalogy: "",
      });
      void ctx.topic.getByCategoryId.invalidate();
      toast.success("Topic updated successfully.");

      // setAddTopicShown(false);
      setTopicEditor?.({
        shown: false,
        porpuse: null,
      });
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      console.log(errorMessage);
      if (errorMessage) {
        if (errorMessage.url) {
          toast.error(errorMessage?.url.join(" "));
        }
        if (errorMessage.title) {
          toast.error(errorMessage?.title.join(" "));
        }
        if (errorMessage.analogies) {
          toast.error(errorMessage?.analogies.join(" "));
        }
      } else {
        toast.error("Something went wrong.");
      }
    },
  });

  const createActivityLogEntry = addActivityLog();

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (topicEditor?.porpuse === "create") {
      createTopic({
        title: input?.title,
        category: data,
        slug: topicSlug,
        // a new cuid generated by the client
        // id: "",
        id: input.id !== "" ? input.id : "",

        url: input?.linkToDocs,
        starter: {
          id: sessionData?.user?.id!,
        },
        // append firstAnalogy to analogies array
        analogies: [
          {
            title: `${input?.title ?? "untitled"} by x`,
            id: "",
            description: input?.firstAnalogy,
          },
        ],
      });
      createActivityLogEntry({
        entityType: "topic",
        entityId: input.id,
        entityTitle: input.title,
        action: "created",
      });
    } else if (topicEditor?.porpuse === "edit") {
      editTopic({
        title: input?.title,
        category: data,
        slug: topicSlug,
        // a new cuid generated by the client
        // id: "",
        id: input.id !== "" ? input.id : "",

        url: input?.linkToDocs,
        starter: {
          id: sessionData?.user?.id!,
        },
        // append firstAnalogy to analogies array
        analogies: [
          {
            title: `${input?.title ?? "untitled"} by x`,
            id: "",
            description: input?.firstAnalogy,
          },
        ],
      });
      createActivityLogEntry({
        entityType: "topic",
        entityId: input.id,
        entityTitle: input.title,
        action: "updated",
      });
    }
  };

  return (
    <>
      {["ADMIN", "EDITOR", "USER"].includes(sessionData?.user.role) ? (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto flex w-full flex-col items-start justify-center "
        >
          <div
            id="add-topic-body"
            className="mt-auto grid w-full grid-cols-2 gap-x-6 gap-y-14 rounded-[12px] border border-[#c8c8c8] bg-[#ebeaea] px-6  py-6 transition-all duration-300 hover:border-[#c1c1c1]"
          >
            <div className="sm:col-span-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Topic title
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  name="title"
                  className="mt-1 block w-full  max-w-[100%] rounded-[12px] border border-gray-300 px-3 py-2 shadow-sm !outline-none ring-0 focus:border-[#c1c1c1] focus:ring-[#c1c1c1] sm:text-sm"
                  placeholder="Ex: Closure"
                  defaultValue={""}
                  required
                  value={input?.title}
                  onChange={(event) =>
                    setInput({ ...input, title: event.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>
              <p className="ml-2 mt-2.5 text-xs text-gray-500">
                Must be a subject related to {UrlCategory}.
              </p>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700"
              >
                Link to docs
              </label>
              <div className="mt-1">
                <input
                  id="link"
                  name="link"
                  className="mt-1 block w-full  max-w-[100%] rounded-[12px] border border-gray-300 px-3 py-2 shadow-sm !outline-none ring-0 focus:border-[#c1c1c1] focus:ring-[#c1c1c1] sm:text-sm"
                  placeholder="https://..."
                  defaultValue={""}
                  required
                  value={input?.linkToDocs}
                  onChange={(event) =>
                    setInput({ ...input, linkToDocs: event.target.value })
                  }
                  disabled={isSubmitting}
                />
              </div>
              <p className="ml-2 mt-2.5 text-xs text-gray-500">
                Provide a link to official documentations.
              </p>
            </div>
            {topicEditor?.porpuse === "edit" ? (
              ""
            ) : (
              <div className="sm:col-span-2">
                {" "}
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your analogy for this topic{" "}
                  {topicEditor?.porpuse === "edit"
                    ? "(Disabled when editing)"
                    : ""}
                </label>
                <div className="group mt-1 w-full rounded-[12px] border border-gray-200 bg-gray-50 shadow-sm transition-all hover:border-[#c1c1c1] focus:border-[#c1c1c1] dark:border-gray-600 dark:bg-gray-700">
                  <div className="rounded-[12px] bg-white px-6 py-6 dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">
                      Add your analogy
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      className="w-full border-0 border-transparent bg-white px-0 text-sm text-[#2A2A2E] !outline-none  group-focus:border-[#c1c1c1] dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                      placeholder="Add your analogy ..."
                      required
                      value={input?.firstAnalogy}
                      onChange={(event) =>
                        setInput({ ...input, firstAnalogy: event.target.value })
                      }
                      disabled={isSubmitting || topicEditor?.porpuse === "edit"}
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
                    <div className="flex space-x-1 pl-0 sm:pl-2">
                      <button
                        type="button"
                        className=" font-small inline-flex cursor-pointer justify-center rounded p-2 text-xs text-gray-500 hover:bg-gray-100 hover:text-[#2A2A2E] dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        how to write markdown?
                      </button>
                    </div>
                  </div>
                </div>
                <p className="ml-6 mt-2.5 text-xs text-gray-500">
                  <ul>
                    <li className="list-disc py-1">
                      Each topic must have at least one analogy to get started.
                    </li>
                    <li className="list-disc py-1">
                      {/* define what an analogy is */}
                      An analogy is a short explanation of a topic that helps
                      you understand it better.
                    </li>
                    <li className="list-disc py-1">
                      After submition, analogies must be verified by admins to
                      be published.
                    </li>
                  </ul>
                </p>
              </div>
            )}
            <div className="flex w-full flex-row justify-end sm:col-span-2">
              {isSubmitting && <CornerLoading />}

              {topicEditor?.porpuse === "edit" && (
                <button
                  type="button"
                  className="mx-3 mb-3 mt-2 inline-flex justify-center  px-4 py-2 font-semibold text-[#2a2a2e] transition-all hover:text-[#bc2f2f]"
                  onClick={deleteTopicHandler(input)}
                  disabled={isSubmitting}
                >
                  Delete topic
                </button>
              )}
              <button
                type="submit"
                onClick={formSubmitHandler}
                disabled={isSubmitting}
                className="group  flex flex-row justify-center rounded-xl
                border border-[#5c2c1d2b] bg-[#ff7263] px-6 py-1.5 text-sm font-semibold text-[#ffffffd3] shadow-sm transition-all
                duration-200 [text-shadow:_0_1px_0_rgb(0_0_0_/_10%)] hover:border-[#5c2c1d66]  hover:shadow-md"
              >
                <span className="cursor-pointer transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:[text-shadow:_0_2px_0_rgb(0_0_0_/_15%)]">
                  Submit topic
                </span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mt-auto grid h-full   grid-cols-1 gap-x-6 gap-y-14 rounded-[12px] border border-[#c8c8c8] bg-[#ebeaea] px-6  py-6 transition-all duration-300 hover:border-[#c1c1c1]">
          <div className="flex select-none flex-col items-center justify-center text-gray-500">
            {" "}
            <AiFillLock />
            <span
              className="mt-2 cursor-pointer transition-all hover:text-gray-700"
              onClick={() => signIn()}
            >
              Sign in to create a topic
            </span>
          </div>
        </div>
      )}
    </>
  );
}
