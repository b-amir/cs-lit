import { type NextRequest, NextResponse } from 'next/server';
// import withAuth from "next-auth/middleware"
// export { default } from "next-auth/middleware"


// export const config = {
//   // With this, your entire application is protected and if you try to access it, it will redirect you to your Sign Up page. 
//   matcher: ["/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)", "/"],

//   //  If you want to protect only some routes, you can use the matcher option.
//   // matcher: ["/api/trpc/[trpc].ts", "/api/trpc/[trpc]/[...trpc].ts"],

// };

export default async function middleware(req: NextRequest) {
  // const path = req.nextUrl.pathname;
  // const session = await getSession({ req });
  const session = !!req.cookies.get("next-auth.session-token")

  if (!session) {
    return NextResponse.redirect(new URL(`/excuse/me/W/T/F`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin']
}