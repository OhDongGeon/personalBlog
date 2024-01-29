import MainLayout from '../layout/mainLayout';
import PostAction from './postAction';

function PostCreate() {

  return (
    <div>
      <MainLayout>
        <PostAction 
            actionTitle = "새 글 작성"
            initialData = {{postId: '', title: '', content: '', userId: 10, status: 'public', viewCount: 0}}
            buttonTitle = "저장"
        />
      </MainLayout>
    </div>
  );
}
export default PostCreate;
