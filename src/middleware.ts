import { convexAuthNextjsMiddleware, createRouteMatcher, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";
const isPublicInPage = createRouteMatcher(["/signin"]);
 
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
 
  if (!isPublicInPage(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }
  //TODO:once user is authenicated just redirect another valid page
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};