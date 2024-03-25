import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";
import { GoBackButton } from "@/components/GoBackButton";
import { CornerLoading } from "@/components/Loading/Spinner";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type SignInErrorTypes } from "next-auth/core/pages/signin";
import { BsGoogle, BsDiscord, BsGithub } from "react-icons/bs";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  // --- get error from router query and store as state --- //
  const [errorState, setErrorState] = useState(router.query.error || "none");
  useEffect(() => {
    setErrorState(router.query.error || "none");
  }, [router.query.error]);

  if (status === "loading") {
    return <CornerLoading />;
  }

  // --- if authenticated users end up in /auth/login somehow, offer them to go back --- //
  // --- if they just type the url and there's no back in history, got to "/"        --- //
  if (status === "authenticated") {
    return (
      <div className="flex h-screen w-full select-none flex-col items-center justify-center text-gray-500">
        You&apos;re already signed in
        <GoBackButton />
      </div>
    );
  }

  // --- store the previous page they were on for callbackURL --- //
  const callbackURL = router.query.callbackUrl || "/home";

  // --- clean error messages for auth situations from original auth-js (some are clarified) --- //
  const errors: Record<SignInErrorTypes, string> = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallback: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked:
      "This email is associated with another provider. Use the original provider for security reasons.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
    default: "Unable to sign in.",
  };

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
      <div className="mx-auto flex flex-col rounded-3xl shadow-[0px_0px_0px_1px_#00000020,0px_3px_8px_0px_#00000020,0px_10px_13px_9px_#00000008,0px_5px_4px_2px_#00000007]  ">
        <div className=" flex w-full flex-col items-center justify-center rounded-t-3xl border-b border-gray-300 bg-[#4545450f] py-10  backdrop-blur-md">
          <Link href="/home">
            <Image
              priority={true}
              data-testid="logo"
              src={"/assets/logo.svg"}
              width={180}
              height={91.1}
              alt={"CS LIT: like I'm 10"}
            />
          </Link>
        </div>
        <div className=" rounded-b-3xl bg-[#ffffffd8]  px-16 pt-12 backdrop-blur-3xl">
          {errorState !== "none" && (
            <div className="error">
              <p className="-mt-5 mb-5 max-w-[280px] rounded-lg border border-yellow-500 bg-yellow-50 p-3 text-center text-xs text-yellow-800">
                {Object.keys(errors).includes(errorState as SignInErrorTypes)
                  ? errors[errorState as SignInErrorTypes]
                  : errors.default}
              </p>
            </div>
          )}
          <h1 className="text-md mb-4 text-center text-xs font-normal text-gray-400">
            Sign in using providers
          </h1>
          <button
            data-testid="google-signin"
            onClick={() =>
              void signIn("google", {
                callbackUrl: callbackURL as string,
              })
            }
            className="mx-auto mb-3 flex w-full place-content-center items-center rounded-2xl border border-gray-300 bg-white px-6 py-2 shadow-sm transition-all duration-200 hover:border-gray-400  hover:bg-blue-100 hover:text-gray-900  "
          >
            <BsGoogle className="mb-0.5 mr-4" /> Sign in with Google
          </button>
          <button
            onClick={() =>
              void signIn("discord", {
                callbackUrl: callbackURL as string,
              })
            }
            className="mx-auto mb-3 flex w-full place-content-center items-center rounded-2xl border border-gray-300 bg-white px-6 py-2 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-indigo-100 hover:text-gray-900 "
          >
            <BsDiscord className="mb-0.5 mr-4" /> Sign in with Discord
          </button>
          <button
            data-testid="github-signin"
            onClick={() =>
              void signIn("github", {
                callbackUrl: callbackURL as string,
              })
            }
            className="mx-auto mb-3 flex w-full place-content-center items-center rounded-2xl border border-gray-300 bg-white px-6 py-2 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-200 hover:text-gray-900 "
          >
            <BsGithub className="mb-0.5 mr-4" /> Sign in with GitHub
          </button>

          <h1 className="text-md mb-4 mt-8 text-center text-xs font-normal text-gray-400">
            or via magic link
          </h1>
          <input
            type="email"
            data-testid="login-email-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void signIn("email", {
                  callbackUrl: callbackURL as string,
                  email: e.currentTarget.value,
                });
              }
            }}
            placeholder="Enter your email"
            className="mb-12 flex w-full items-center rounded-2xl border border-gray-300 px-6 py-2 transition-colors duration-200 hover:bg-gray-50 hover:text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
