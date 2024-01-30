import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Typography, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import MainLayout from './layout/mainLayout';
import { postsService } from './../services/postService';


function BlogHome() {

  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.
  const [getOrderBy, setOrderBy] = useState({ "created_at": "desc" });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsService.getCustomPost({ orderBy: getOrderBy }, 0, 20);
        setPosts(response.data);
      } catch (err) {
        console.log('게시물을 가져오는 데 실패했습니다.');
        console.error(err);
      }
    };

    if(router.isReady){
      fetchPost()
    }
  }, [router.isReady, getOrderBy]);

  // 정렬 기준 변경
  const handleSortChange = (event) => {
    setOrderBy(JSON.parse(event.target.value)); // getOrderBy도 업데이트
  };

  // board/[id] 경로로 라우팅합니다.
  const handlePostClick = (post) => {
    router.push(`/board/${post.postId}`);
  };

  return (
    <div>
      <MainLayout>
        <Container>
          <Grid item xs={12} sm={6} md={4} lg={3} sx={{ marginBottom: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120, width: '100%' }}>
              <InputLabel id="sortSelectLabel"/>
                <Select labelId="sortSelectLabel" value={ JSON.stringify(getOrderBy) } onChange={handleSortChange}>
                  <MenuItem value={JSON.stringify({ "view_count": "desc" })}>조회순</MenuItem>
                  <MenuItem value={JSON.stringify({ "created_at": "asc" })}>업로드 일자 오름차순</MenuItem>
                  <MenuItem value={JSON.stringify({ "created_at": "desc" })}>업로드 일자 내림차순</MenuItem>
                  <MenuItem value={JSON.stringify({ "title": "asc" })}>제목 오름차순</MenuItem>
                  <MenuItem value={JSON.stringify({ "title": "desc" })}>제목 내림차순</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid container spacing={3}>
            {posts.map(post => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
                <CardActionArea onClick={() => handlePostClick(post)}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CardMedia
                      component="img"
                      alt="미리보기 이미지"
                      height="140"
                      image={post.imageUrl}
                      sx={{ objectFit: 'cover' }} // 이미지가 카드 크기에 맞게 채워지도록 조정합니다.
                    />
                    <Box flexGrow={1} display="flex" flexDirection="column">
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h7" component="h2">{post.title}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{post.content}</Typography>
                      </CardContent>
                      <Box p={1} display="flex" justifyContent="flex-start" flexWrap="wrap">
                        <Chip label={post.categoryName} sx={{ m: 0.5 }} />
                      </Box>
                    </Box>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Container>
      </MainLayout>
    </div>
  );
}

export default BlogHome;
