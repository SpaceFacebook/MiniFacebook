package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.Commentaire;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.servicepost.AuthService;
import com.facebookcloneservice.facebackend.servicepost.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {
    @Autowired
    private CommentaireService commentaireService;
    @Autowired
    private AuthService authService;

    @PostMapping("/ajouter")
    public Commentaire ajouterCommentaire(@RequestBody Commentaire commentaire) {
        // Retrieve the user based on the email
        User user = authService.findByEmail(commentaire.getUser().getEmail());

        if (user != null) {
            // Set the user in the Commentaire entity
            commentaire.setUser(user);
            /*commentaire.setDateCommentaire(new Date());
            System.out.println(commentaire.getDateCommentaire());*/
            // Save the comment
            System.out.println("commentaire : " + commentaire.getContenu() + " ");
            return commentaireService.ajouterCommentaire(commentaire);
        } else {
            return null; // You should handle this case accordingly
        }
    }

    @GetMapping("/post/{postId}")
    public List<Commentaire> obtenirCommentairesPourPost(@PathVariable String postId) {
        System.out.println("Appel de obtenirCommentairesPourPost avec postId : " + postId);
        List<Commentaire> commentaires = commentaireService.obtenirCommentairesPourPost(postId);
        System.out.println("Nombre de commentaires récupérés : " + commentaires.size());
        return commentaires;
    }
    @GetMapping("/post/{postId}/commentCount")
    public ResponseEntity<Integer> getCommentCountForPost(@PathVariable String postId) {
        int commentCount = commentaireService.getCommentCountForPost(postId); // Remplacez cela par l'appel à votre service de commentaires pour obtenir le nombre de commentaires pour ce post
        return ResponseEntity.ok(commentCount);
    }


    // Autres méthodes de contrôleur pour gérer les commentaires
}
