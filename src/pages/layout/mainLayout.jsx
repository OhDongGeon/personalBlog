import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Instagram, Twitter, LinkedIn, Facebook } from '@mui/icons-material';
import { AppBar, Button, Container, Grid, IconButton, Link, Toolbar, Typography, useScrollTrigger, Slide  } from '@mui/material';
import { Box } from '@mui/system';


function MainLayout({ children }) {

    const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.
    const [appBarHeight, setAppBarHeight] = useState(0);
    const scrollTrigger = useScrollTrigger();

    // 스크롤 움직일시 메뉴바
    const scrollTimeout = {
        enter: 1000,
        exit: 1000
    };

    const handleCreatePost = () => {
        router.push('/board/create');
    };

    const handleMainPageClick = () => {
        router.push(`/..`);
    };

    useEffect(() => {
        // AppBar 높이를 설정하는 함수
        const setAppBarHeightFunc = () => {
          const appBar = document.querySelector('.MuiAppBar-root');
          if (appBar) {
            setAppBarHeight(appBar.clientHeight);
          }
        };
      
        // 이벤트 리스너를 등록합니다.
        window.addEventListener('resize', setAppBarHeightFunc);
      
        // 처음 마운트될 때 높이 설정
        setAppBarHeightFunc();
      
        // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
        return () => {
          window.removeEventListener('resize', setAppBarHeightFunc);
        };
      }, []);
    

    return (
        <div>
            <Slide appear={ false } direction="down" in={ !scrollTrigger } timeout={ scrollTimeout }>
                <AppBar position="fixed">
                    <Toolbar>
                        <Grid container spacing={1} alignItems="center" justifyContent="center">
                            <Grid item xs={12} sm={true}>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    호주의 블로그
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={true} container justifyContent="center">
                                <Button color="inherit" onClick={() => handleMainPageClick()}>홈</Button>
                                <Button color="inherit">울룰루</Button>
                                <Button color="inherit">쿼카</Button>
                                <Button color="inherit">캥거루</Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit" onClick={handleCreatePost}>
                                    새 글 작성
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Slide>
            
            
            <div style={{ paddingTop: appBarHeight,  paddingBottom: appBarHeight }}>
                { children }
            </div>
            
            <footer style={{ textAlign: 'center', padding: '2em 0', background: '#333', color: 'white' }}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>회사 정보</Typography>
                            <Typography>주소: 서울특별시 강남구 </Typography>
                            <Typography>전화: 02-1234-5678</Typography>
                            <Typography>Email: info@myblog.com</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>링크</Typography>
                            <Link href="#" color="inherit">홈</Link><br />
                            <Link href="#" color="inherit">블로그</Link><br />
                            <Link href="#" color="inherit">포트폴리오</Link><br />
                            <Link href="#" color="inherit">연락처</Link>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>소셜 미디어</Typography>
                            <IconButton color="inherit">
                                <Facebook />
                            </IconButton>
                            <IconButton color="inherit">
                                <Instagram />
                            </IconButton>
                            <IconButton color="inherit">
                                <Twitter />
                            </IconButton>
                            <IconButton color="inherit">
                                <LinkedIn />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <Typography variant="body2">© 2023 나의 블로그. 모든 권리 보유.</Typography>
                    </Box>
                </Container>
            </footer>
        </div>
    )
}

export default MainLayout;