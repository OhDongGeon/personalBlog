import React, { useState } from 'react';
import { Card, Grid, Typography, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';


function PostAction({ actionTitle, initialTitle, initialContent, buttonTitle }) {

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {

    if (!title.trim())  {
      console.warn("제목을 입력하세요.");
      return;
    }

    console.log('제목 : ', title);
    console.log('내용 : ', content);
  };

  return (
    <div>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={0} justifyContent="center">
            <Card sx={{ display: 'flex', flexDirection: 'column', width: '600px'}}>
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}> { actionTitle } </Typography>
              <TextField id="title" label="제목" defaultValue={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" margin="normal"/>
              <TextField id="content" label="내용" defaultValue={content} onChange={(e) => setContent(e.target.value)}  variant="outlined" margin="normal" multiline rows={4}/>
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} > { buttonTitle } </Button>
            </Card>
        </Grid>
      </Box>
    </div>
  );
}
export default PostAction;
