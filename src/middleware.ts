import { authMiddleware as authUsersMiddleware } from "@clerk/nextjs";

export default authUsersMiddleware({
    publicRoutes: ['/', /^\/api\/.*/, '/dashboard'],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};