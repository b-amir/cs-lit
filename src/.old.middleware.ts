import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();


export const config = {
  // With this, your entire application is protected and if you try to access it, it will redirect you to your Sign Up page. 
  matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)", "/"],

  //  If you want to protect only some routes, you can use the matcher option.
  // matcher: ["/api/trpc/[trpc].ts", "/api/trpc/[trpc]/[...trpc].ts"],

};

