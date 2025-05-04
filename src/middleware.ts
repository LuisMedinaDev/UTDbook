import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isPublicRoute = createRouteMatcher([
  "/", "/sign-in(.*)", "/sign-up(.*)", "/sign-up/verify-email-address(.*)"
]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn } = auth();

  if (isPublicRoute(context.request)) {
    return;
  }

  if (!isPublicRoute(context.request) && !userId) {
    return Response.redirect( new URL("/sign-up", context.request.url) );
  }

  return;
});
