// postService.js

import { POST_API } from './../api/endpoints';
import axiosInstance from './../api/axiosInstance';

export const postsService = {
  // 다수의 게시물 조회 (GET /posts/pages, form:body, param:offset, page)
  getCustomPost: (orderBy, offset, page) => {
    return axiosInstance.post(`${POST_API}/pages`, orderBy, {
      params:{offset, page}
    });
  },

  // 게시글 조회 (GET /posts/{postId})
  getPost: (postId) => {
    return axiosInstance.get(`${POST_API}/${postId}`);
  },

  // 베스트 게시물 (GET /posts/best/{limit})
  getBestPost: (limit) => {
    return axiosInstance.get(`${POST_API}/best/${limit}`);
  },

  // 새로운 게시글 생성 (POST /posts)
  createPost: (postData) => {
    return axiosInstance.post(POST_API, postData);
  },

  // 게시글 수정 (PUT /posts/{postId})
  updatePost: (postId, postData) => {
    return axiosInstance.put(`${POST_API}/${postId}`, postData);
  },
  
  // 게시글 조회수 증가
  updateViewCountPost: (postId) => {
    return axiosInstance.patch(`${POST_API}/${postId}/view-count`);
  },

  // 게시글 삭제 (DELETE /posts/{postId})
  deletePost: (postId) => {
    return axiosInstance.delete(`${POST_API}/${postId}`);
  }

};

