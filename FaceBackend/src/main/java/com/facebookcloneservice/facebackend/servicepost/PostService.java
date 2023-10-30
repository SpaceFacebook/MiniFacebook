package com.facebookcloneservice.facebackend.servicepost;

import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.modelpost.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {
    Post addPost(Post post) throws Exception;

    List<Post> getPost();

    List<PostEntity> getPostsByUser(User user);

    List<PostEntity> getPostsByEmail(String userEmail);

    Optional<PostEntity> getPostById(String id);
}
