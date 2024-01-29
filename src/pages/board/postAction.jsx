import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { postsService } from '../../services/postService';


function PostAction({ actionTitle, buttonTitle, initialData }) {

  const router = useRouter();
  // 사용자는 임시
  const [postData, setPostData] = useState({ postId:'', title: '', content: '', userId: '', status: '', viewCount: ''});
 
  useEffect(() => {
      setPostData({...initialData});
  }, [initialData]);


  // 제목 변경을 처리하는 함수 
  const handleTitleChange = (e) => {
    setPostData(prevState => ({ ...prevState, title: e.target.value }));
  };
  
  // 내용 변경을 처리하는 함수
  const handleContentChange = (e) => {
    setPostData(prevState => ({ ...prevState, content: e.target.value }));
  };

  // 저장 버튼 클릭
  const handleSubmit = () => {

    // 제목이 빈칸인지 확인
    if (!postData.title.trim())  {
      alert("제목을 입력하세요.");
      console.warn("제목을 입력하세요.");
      return;
    }

    if (postData.postId == '') {
      createPost();
    } else {
      updatePost();
    }
  };

  const createPost = async () => {
    try {
      const response = await postsService.createPost(postData);
      router.push(`/board/${response.data.postId}`);
      
    } catch (err) {
      alert('게시글 생성에 실패했습니다.');
      console.error(err);
    }
  };

  const updatePost = async () => {
    try {
      const response = await postsService.updatePost(postData.postId, postData);
      
      router.push(`/board/${postData.postId}`);
    } catch (err) {
      alert('게시글 수정에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={0} justifyContent="center">
            <Card sx={{ display: 'flex', flexDirection: 'column', width: '600px'}}>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}> { actionTitle } </Typography>

              <TextField id="title" label="제목" value={postData.title} onChange={handleTitleChange} variant="outlined" margin="normal"/>
              <TextField id="content" label="내용" value={postData.content} onChange={handleContentChange} variant="outlined" margin="normal" multiline rows={4}/>
              
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} > { buttonTitle } </Button>
            </Card>
        </Grid>
      </Box>
    </div>
  );
}
export default PostAction;
