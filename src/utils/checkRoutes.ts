export const shouldShowSidebar = (
  pathname: string,
  isAuthenticated: boolean
) => {
  const excludedPaths = ["/auth/login", "/auth/register"];
  return isAuthenticated || !excludedPaths.includes(pathname);
};
