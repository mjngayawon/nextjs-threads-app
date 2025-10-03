"use client";

import { likeOnThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  threadId: string;
  userId: string;
  hasLiked?: boolean;
}

const LikeThread = ({ threadId, userId, hasLiked }: Props) => {
  const [isLiked, setIsLiked] = useState(hasLiked);
  const pathname = usePathname();

  useEffect(() => {
    setIsLiked(hasLiked);
  }, [hasLiked]);

  const handleLikeClick = async () => {
    try {
      setIsLiked((prev) => !prev);

      await likeOnThread(threadId, userId, pathname);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setIsLiked((prev) => !prev);
    }
  };
  return (
    <Image
      src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleLikeClick}
    />
  );
};

export default LikeThread;
