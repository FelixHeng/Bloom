import React from "react";
import { Image } from "cloudinary-react";
import { usePostQuery } from "../../generated/graphql";
import { useRouter } from "next/router";

interface AvatarProps {}

export const Avatar: React.FC<AvatarProps> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  console.log(router.query);
  return (
    <div>
      <Image
        style={{ width: 100 }}
        cloudName="felixh"
        publicId={data?.post?.creator.avatar}
      />
    </div>
  );
};
