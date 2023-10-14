package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.modelpost.Post;
import com.facebookcloneservice.facebackend.postrepository.UserRepository;
import com.facebookcloneservice.facebackend.servicepost.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/post")
public class PostController {
    private PostService postService;
    @Autowired
    private UserRepository userRepository;

    public PostController(PostService postService) {
        this.postService = postService;
    }
    @PostMapping()
    public Post addPost(@RequestParam Map<String,String> requestparams) throws Exception {
       String strpost=requestparams.get("post");
        String email=requestparams.get("email");
        System.out.println("maillll: "+email);
        String name=requestparams.get("name");
        String file=requestparams.get("file");
        String image=requestparams.get("image");
        String profilePic=requestparams.get("profilePic");
        Post post=Post.builder()
                .file(file)
                .name(name)
                .email(email)
                .post(strpost)
                .profilePic(profilePic)
                .image(image)
                .timeStamp(new Date().toString())
                .build();
        post = postService.addPost(post);

        return  post;
    }
    @GetMapping
    public List<Post> getPost(){
        return postService.getPost();
    }
    @GetMapping("/api/postUser")
    public ResponseEntity<List<PostEntity>> getPostsByUserEmail(@RequestParam String userEmail) {
        // Recherchez l'utilisateur par son email
        Optional<User> userOptional = userRepository.findByEmail(userEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Récupérez les posts de l'utilisateur
            List<PostEntity> userPosts = postService.getPostsByEmail(userEmail);
            return ResponseEntity.ok(userPosts);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }
}
