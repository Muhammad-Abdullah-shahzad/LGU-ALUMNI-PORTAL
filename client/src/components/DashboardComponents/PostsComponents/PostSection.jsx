// PostsSection.jsx
import RowWrapper from "../CardsWrapper/CardsWrapper";
import Post from "./Post";
import Loader from "../../Loader/Loader";
import ViewPosts from "../ViewPost/ViewPosts";
import { useFetch } from "../../../hooks/useFetch";
import AddPost from "../AddPost/AddPost";
import { usePost } from "../../../hooks/usePost";
import { useEffect } from "react";


function forceRestoreScroll() {
  try {
    // remove any leftover modal-backdrop elements
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((b) => b.remove());

    // remove bootstrap modal-open class and reset overflow styles
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  } catch (e) {
    /* swallow — best-effort cleanup */
    console.warn("forceRestoreScroll cleanup error:", e);
  }
}

export default function PostsSection({ readMode = false }) {
  const Base_Url = import.meta.env.VITE_API_URL;



  const { loading: postLoading, data: posts, refetch } = useFetch(`${Base_Url}/post/all`);

  const { loading, post } = usePost(`${Base_Url}/post/create`);

  useEffect(() => {
    // in case some modal left the page locked, try to clean up on mount
    forceRestoreScroll();

    // Also listen for bootstrap modal hidden event to ensure cleanup
    const handler = () => forceRestoreScroll();
    window.addEventListener("hidden.bs.modal", handler);

    return () => {
      window.removeEventListener("hidden.bs.modal", handler);
      forceRestoreScroll();
    };
  }, []);

  if (postLoading || loading) return <Loader />;

  return (
    <div className="container px-2 px-md-4 py-3">
      {readMode ||
        <AddPost title="Add Post" postReq={post} refetch={refetch} />}
      <div className="mt-4">
        <ViewPosts posts={posts || []} refetchPost={refetch} readMode={readMode} />
      </div>
    </div>
  );
}
