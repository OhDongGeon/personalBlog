import { useRouter } from "next/router";
import MainLayout from '../../layout/mainLayout';
import PostAction from '../postAction';
import posts from "../../post/posts";

function PostEidt({actionTitle, initialTitle, initialContent }) {

  const router = useRouter();
  const { id } = router.query;
  const post = posts.find((p) => p.id === parseInt(id, 10));

  if (!id || !posts) {
    return;
  }

  return (
    <div>
      <MainLayout>
        <PostAction 
            actionTitle = "게시물 수정"
            initialTitle = { post.title }
            initialContent = { post.content }
            buttonTitle = "수정"
        />
      </MainLayout>
    </div>
  );
}
export default PostEidt;
