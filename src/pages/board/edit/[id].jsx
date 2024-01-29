import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import MainLayout from '../../layout/mainLayout';
import PostAction from '../postAction';
import posts from "../../post/posts";
import { postsService } from "../../../services/postService";

function PostEdit() {

  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({postId: '', title: '', content: '', userId: '', status: '', viewCount: ''});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsService.getPost(id);
        console.log(response.data)
        setPost(response.data);
      } catch (err) {
        console.log('게시글을 불러오는 데 실패했습니다.');
        console.error(err);
      }
    };

    if(router.isReady){
      fetchPost()
    }
  }, [id, router.isReady]);

  if (!id || !posts) {
    return;
  }

  return (
    <div>
      <MainLayout>
        <PostAction 
            actionTitle = "게시물 수정"
            initialData = { post }
            buttonTitle = "수정"
        />
      </MainLayout>
    </div>
  );
}
export default PostEdit;
