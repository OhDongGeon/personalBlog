import MainLayout from '../layout/mainLayout';
import PostAction from './postAction';

function PostCreate({actionTitle, initialTitle, initialContent }) {

  return (
    <div>
      <MainLayout>
        <PostAction 
            actionTitle = "새 글 작성"
            initialTitle = ""
            initialContent = ""
            buttonTitle = "저장"
        />
      </MainLayout>
    </div>
  );
}
export default PostCreate;
