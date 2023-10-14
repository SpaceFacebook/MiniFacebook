package com.facebookcloneservice.facebackend.servicepost;

import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.modelpost.Post;
import com.facebookcloneservice.facebackend.postrepository.PostEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface PostService {
    Post addPost(Post post) throws Exception;

    List<Post> getPost();

    List<PostEntity> getPostsByUser(User user);

    List<PostEntity> getPostsByEmail(String userEmail);
}
