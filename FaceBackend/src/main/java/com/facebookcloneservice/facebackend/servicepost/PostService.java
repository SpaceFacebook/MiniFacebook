package com.facebookcloneservice.facebackend.servicepost;

import com.facebookcloneservice.facebackend.modelpost.Post;

import java.util.List;

public interface PostService {

    Post addPost(Post post) throws Exception;

    List<Post> getPost();
}
