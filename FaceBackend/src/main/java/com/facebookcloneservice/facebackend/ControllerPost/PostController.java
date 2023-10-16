package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.Commentaire;
import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import com.facebookcloneservice.facebackend.entityPost.Reaction;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.modelpost.Post;
import com.facebookcloneservice.facebackend.postrepository.CommentaireRepository;
import com.facebookcloneservice.facebackend.postrepository.PostEntityRepository;
import com.facebookcloneservice.facebackend.postrepository.ReactionRepository;
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
    @Autowired
    private PostEntityRepository postEntityRepository;
    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private ReactionRepository reactionRepository;

    public PostController(PostService postService) {
        this.postService = postService;
    }
    @PostMapping()
    public Post addPost(@RequestParam Map<String, String> requestparams) throws Exception {
        String strpost = requestparams.get("post");
        String email = requestparams.get("email");
        System.out.println("maillll: " + email);
        String name = requestparams.get("name");
        String file = requestparams.get("file");
        String image = requestparams.get("image");
        String profilePic = requestparams.get("profilePic");

        // Récupérer l'utilisateur par son email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            Post post = Post.builder()
                    .file(file)
                    .name(name)
                    .email(email)
                    .user(user) // Associez l'utilisateur ici
                    .post(strpost)
                    .profilePic(profilePic)
                    .image(image)
                    .timeStamp(new Date().toString())
                    .build();

            post = postService.addPost(post);

            return post;
        } else {
            // Gérer le cas où l'utilisateur n'existe pas (vous pouvez renvoyer une erreur ici)
            // Vous pouvez également choisir de créer un utilisateur automatiquement
            // Exemple de renvoi d'une erreur :
            throw new Exception("Utilisateur introuvable pour l'email : " + email);
        }
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
    @DeleteMapping("/deletePost/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId, @RequestParam String userEmail) {
        Optional<PostEntity> postOptional = postEntityRepository.findById(postId);

        if (postOptional.isPresent()) {
            PostEntity post = postOptional.get();

            // Vérifiez si l'utilisateur connecté est l'auteur de la publication
            if (post.getEmail().equals(userEmail)) {
                // Supprimez d'abord les commentaires associés
                for (Commentaire commentaire : post.getCommentaires()) {
                    commentaireRepository.delete(commentaire);
                }

                // Supprimez ensuite les réactions associées
                for (Reaction reaction : post.getReactions()) {
                    reactionRepository.delete(reaction);
                }

                // Enfin, supprimez la publication
                postEntityRepository.delete(post);

                return new ResponseEntity<>("Publication supprimée avec succès", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Vous n'êtes pas autorisé à supprimer cette publication", HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>("Publication non trouvée", HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(value = "/deletePost/{postId}", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptionsRequest() {
        return ResponseEntity.ok().build();
    }


}
