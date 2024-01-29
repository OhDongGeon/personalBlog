import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Chip, Grid, Typography, Button } from '@mui/material';
import MainLayout from "../layout/mainLayout";
import posts from "../post/posts";
import { postsService } from "../../services/postService";


function Board() {

    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState({ postId: '', title: '', content: '', image:'' });

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await postsService.getPost(id);
          setPost(response.data);

          const viewedPosts = sessionStorage.getItem('viewedPosts') ? JSON.parse(sessionStorage.getItem('viewedPosts')) : [];

          if (!viewedPosts.includes(response.data.postId)) {
            // 조회 기록이 없으면 조회수 업데이트 및 localStorage에 기록
            await postsService.updateViewCountPost(response.data.postId);
            sessionStorage.setItem('viewedPosts', JSON.stringify([...viewedPosts, response.data.postId]));
          }

        } catch (err) {
          console.log('게시글을 불러오는 데 실패했습니다.');
          console.error(err);
        }
      };

      if(router.isReady){
        fetchPost();
      }
    }, [id, router.isReady]);

    // URL에서 posts 배열이 undefined인 경우 처리
    if (!id || !posts) {
      return;
    }

    const handleMainPageClick = () => {
      router.push(`/..`);
    };

    const handlePostUpdateClick = () => {
      router.push(`./edit/${post.postId}`);
    };

    const handlePostDeleteClick = async () => {
      try {

        const confirmDelete = window.confirm("삭제하시겠습니까?");

        if (confirmDelete) {
          await postsService.deletePost(post.postId);

          router.push('/..'); 
        }
      } catch (err) {
        console.error("게시글 삭제 실패:", err);
        alert("게시글 삭제에 실패했습니다.");
      }
    };


  return (
    <div>
      <MainLayout>
        <Grid container spacing={0} justifyContent="center">
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '600px'}}>
              <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">{post.title}</Typography>
              </CardContent>
              <Typography fontSize="30px">{post.content}</Typography>


              <CardMedia
                component="img"
                alt="미리보기 이미지"
                height="100%"
                image={post.imageUrl}
                sx={{ objectFit: 'cover' }} // 이미지가 카드 크기에 맞게 채워지도록 조정합니다.
              />

              <Typography fontSize="20px">Post ID : {post.postId}</Typography>

              <CardContent>
                <Button variant="contained" onClick={() => handleMainPageClick()}
                  sx={{ backgroundColor: '#4374D9', color: 'white', marginRight: '8px', '&:hover': { backgroundColor: '#0054FF'}}}>
                  메인 페이지로 돌아가기
                </Button>
                <Button variant="contained" onClick={() => handlePostUpdateClick()}
                  sx={{ backgroundColor: '#3AAE3E', color: 'white', marginRight: '8px', '&:hover': { backgroundColor: '#309533' }}}>
                  게시물 수정
                </Button>
                <Button variant="contained" onClick={() => handlePostDeleteClick()}
                  sx={{ backgroundColor: '#BD24A9', color: 'white', '&:hover': { backgroundColor: '#990085' }}}>
                  게시물 삭제
                </Button>
              </CardContent>
            </Card>
          </Grid>
      </MainLayout>
    </div>
  );
}
export default Board;
