package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.modelpost.Post;
import com.facebookcloneservice.facebackend.servicepost.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/post")
public class PostController {
    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }
    @PostMapping()
    public Post addPost(@RequestParam Map<String,String> requestparams) throws Exception {
       String strpost=requestparams.get("post");
        String email=requestparams.get("email");
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
}
