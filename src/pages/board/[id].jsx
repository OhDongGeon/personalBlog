import { useRouter } from "next/router";
import { Card, CardContent, CardMedia, Chip, Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import MainLayout from "../layout/mainLayout";
import posts from "../post/posts";


function Board() {

    const router = useRouter();
    const { id } = router.query;
    const post = posts.find((p) => p.id === parseInt(id, 10));

    // URL에서 posts 배열이 undefined인 경우 처리
    if (!id || !posts) {
      return;
    }

    const handleMainPageClick = () => {
      router.push(`/..`);
    };

    const handlePostUpdateClick = () => {
      router.push(`./eidt/${post.id}`);
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

              <Typography fontSize="20px">Post ID : {post.id}</Typography>

              <Box p={1} display="flex" justifyContent="flex-start" flexWrap="wrap">
                {post.categories.map(category => (
                  <Chip label={category} key={category} sx={{ m: 0.5 }} />
                ))}
              </Box>
              
              <CardContent>
                <Button variant="contained" onClick={() => handleMainPageClick()}
                  sx={{ backgroundColor: '#4374D9', color: 'white', marginRight: '8px', '&:hover': { backgroundColor: '#0054FF'}}}>
                  메인 페이지로 돌아가기
                </Button>
                <Button variant="contained" onClick={() => handlePostUpdateClick()}
                  sx={{ backgroundColor: '#BD24A9', color: 'white', '&:hover': { backgroundColor: '#990085' }}}>
                  게시물 수정
                </Button>
              </CardContent>
            </Card>
          </Grid>
      </MainLayout>
    </div>
  );
}
export default Board;
