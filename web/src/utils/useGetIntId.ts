import { useRouter } from "next/router";

export const useGetIntId = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  console.log("router.query : ", router.query);
  return intId;
};
