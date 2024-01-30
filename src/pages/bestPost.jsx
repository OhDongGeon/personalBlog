import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Chip, Container, Grid, Typography, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import MainLayout from './layout/mainLayout';
import { postsService } from './../services/postService';


function BlogHome() {

  const router = useRouter();
  const [mostCommentPosts, setMostCommentPosts] = useState([]);
  const [mostViewPosts, setMostViewPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const limit = 2;
        const response = await postsService.getBestPost(limit);

        setMostCommentPosts(response.data.mostCommentPosts);
        setMostViewPosts(response.data.mostViewPosts);
        setBestPosts(response.data.bestPosts);

      } catch (err) {
        console.log('게시물을 가져오는 데 실패했습니다.');
        console.error(err);
      }
    };

    if(router.isReady){
      fetchPost()
    }
  }, [router.isReady]);


  // board/[id] 경로로 라우팅합니다.
  const handlePostClick = (post) => {
    router.push(`/board/${post.postId}`);
  };


  return (
    <div>
      <MainLayout>
        <Container sx={{ marginBottom: 3 }}>
          <Box sx={{ border: '1px solid black', borderRadius: '4px', marginBottom: '2rem' }}>
              <Typography variant="h6" sx={{ padding: '1rem' }}>Best Post</Typography>
              <Grid container spacing={3} sx={{ padding: '1rem' }}>
                {bestPosts.map(post => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
                    <CardActionArea onClick={() => handlePostClick(post)}>
                      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia component="img" alt="미리보기 이미지" height="140"image={post.imageUrl} sx={{ objectFit: 'cover' }} />
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
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #007BFF', borderRadius: '4px', marginBottom: '2rem' }}>
                <Typography variant="h6" sx={{ padding: '1rem' }}>Best Comment</Typography>
                <Grid container spacing={3} sx={{ padding: '1rem' }}>
                  {mostCommentPosts.map(post => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={post.postId}>
                      <CardActionArea onClick={() => handlePostClick(post)}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <CardMedia component="img" alt="미리보기 이미지" height="140"image={post.imageUrl} sx={{ objectFit: 'cover' }} />
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
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px solid #FFA500', borderRadius: '4px', marginBottom: '2rem' }}>
                <Typography variant="h6" sx={{ padding: '1rem' }}>Best View</Typography>
                <Grid container spacing={3} sx={{ padding: '1rem' }}>
                  {mostViewPosts.map(post => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={post.postId}>
                      <CardActionArea onClick={() => handlePostClick(post)}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <CardMedia component="img" alt="미리보기 이미지" height="140"image={post.imageUrl} sx={{ objectFit: 'cover' }} />
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
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MainLayout>
    </div>
  );
}

export default BlogHome;
