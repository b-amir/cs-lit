// @ts-nocheck
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { RiErrorWarningFill as ErrorIcon } from "react-icons/ri";

export type ErrorType =
  | "default"
  | "configuration"
  | "accessdenied"
  | "verification";

export interface ErrorProps {
  error?: ErrorType;
}

interface ErrorView {
  status: number;
  heading: string;
  message: JSX.Element;
  signin?: JSX.Element;
}

const ErrorPage = () => {
  const router = useRouter();
  const url = router.query.url;
  const signinPageUrl = router.query.signinPageUrl;
  const error = router.query.error;

  const errors: Record<ErrorType, ErrorView> = {
    default: {
      status: 200,
      heading: "Error",
      message: (
        <p>
          <a className="site" href={url?.origin}>
            {url?.host}
          </a>
        </p>
      ),
    },
    configuration: {
      status: 500,
      heading: "Server error",
      message: (
        <div>
          <p>There is a problem with the server configuration.</p>
          <p>Check the server logs for more information.</p>
        </div>
      ),
    },
    accessdenied: {
      status: 403,
      heading: "Access Denied",
      message: (
        <div>
          <p>You do not have permission to sign in.</p>
          <p>
            <a className="button" href={signinPageUrl}>
              Sign in
            </a>
          </p>
        </div>
      ),
    },
    verification: {
      status: 403,
      heading: "Unable to sign in",
      message: (
        <div>
          <p>The sign in link is no longer valid.</p>
          <p>It may have been used already or it may have expired.</p>
        </div>
      ),
      signin: (
        <p>
          <a className="button" href={signinPageUrl}>
            Sign in
          </a>
        </p>
      ),
    },
  };

  const { status, heading, message, signin } =
    errors[error?.toLowerCase()] ?? errors.default;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gray-100"
      style={{
        backgroundSize: "cover",
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1011%26quot%3b)' fill='none'%3e%3cpath d='M543.1921549232684 99.48187773707852L665.1279999422704 129.88389845066186 695.5300206558537 7.948053431659858 573.5941756368517-22.453967281923468z' fill='rgba(235%2c 235%2c 235%2c 0.8)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1275.52 211.5 a158.83 158.83 0 1 0 317.66 0 a158.83 158.83 0 1 0 -317.66 0z' fill='rgba(235%2c 235%2c 235%2c 0.5)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M859.4242624036511 67.08905032770036L961.9264791972824 70.66850661274394 965.505935482326-31.833710180887337 863.0037186886947-35.413166465930914z' fill='rgba(235%2c 235%2c 235%2c 0.6)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M556.647%2c533.269C576.851%2c533.931%2c593.915%2c520.326%2c604.529%2c503.121C615.799%2c484.852%2c622.764%2c462.09%2c612.023%2c443.505C601.288%2c424.93%2c578.084%2c419.41%2c556.647%2c420.273C536.868%2c421.069%2c517.826%2c430.218%2c508.488%2c447.672C499.596%2c464.292%2c504.668%2c483.724%2c513.91%2c500.151C523.381%2c516.985%2c537.341%2c532.636%2c556.647%2c533.269' fill='rgba(235%2c 235%2c 235%2c 0.6)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M113.42 355.62 a184.25 184.25 0 1 0 368.5 0 a184.25 184.25 0 1 0 -368.5 0z' fill='rgba(235%2c 235%2c 235%2c 0.9)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1078.7775812348004 370.01452982947643L1167.3828404502242 461.7679617083189 1259.1362723290667 373.1627024928951 1170.531013113643 281.4092706140526z' fill='rgba(235%2c 235%2c 235%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1011'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e")`,
      }}
    >
      <button
        onClick={() => router.back()}
        className="align-center justify-middle group absolute left-0 top-0 ml-6  mr-auto mt-4 inline-flex cursor-pointer flex-row items-center justify-center rounded-[12px] border border-transparent px-0 py-1 align-middle text-xs font-normal text-gray-400 transition-all"
      >
        <FaArrowLeft className="mb-0.5 mr-2 transition-all group-hover:-translate-x-0.5 " />
        back
      </button>
      <div className="mx-auto flex min-w-[300px] flex-col rounded-3xl shadow-[0px_0px_0px_1px_#00000020,0px_3px_8px_0px_#00000020,0px_10px_13px_9px_#00000008,0px_5px_4px_2px_#00000007]  ">
        <div className=" flex w-full flex-col items-center justify-center rounded-t-3xl border-b border-gray-300 bg-[#4545450f] py-10  backdrop-blur-md">
          <Link href="/">
            <Image
              src={"/assets/logo17.svg"}
              width={180}
              height={0}
              alt={"CS LIT: like I'm 10"}
            />
          </Link>
        </div>
        <div className=" rounded-b-3xl bg-[#ffffffd8]  px-16 py-12 backdrop-blur-3xl">
          <h1 className="text-md text-md mb-4 flex items-center justify-center gap-2 text-center font-semibold text-gray-400">
            <ErrorIcon className="mb-0.5" /> {heading}
          </h1>

          <div className="text-md mb-4 text-center text-sm font-normal text-gray-700">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
