package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.Commentaire;
import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.servicepost.AuthService;
import com.facebookcloneservice.facebackend.servicepost.CommentaireService;
import com.facebookcloneservice.facebackend.servicepost.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {
    @Autowired
    private CommentaireService commentaireService;
    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;
    @PostMapping("/ajouter")
    public Commentaire ajouterCommentaire(@RequestBody Map<String, String> commentaireData) {
        String contenu = commentaireData.get("contenu");
        String userEmail = commentaireData.get("userEmail");
        String postId = commentaireData.get("postId");
        String dateCommentaireString = commentaireData.get("dateCommentaire"); // Récupérez la date en tant que chaîne de caractères
        // Effectuez les validations nécessaires pour vous assurer que ces valeurs ne sont pas nulles

        // Créez une instance de Commentaire avec les données extraites
        Commentaire commentaire = new Commentaire();
        commentaire.setContenu(contenu);
        // Convertissez la chaîne de caractères en objet java.util.Date
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
            Date dateCommentaire = dateFormat.parse(dateCommentaireString);
            commentaire.setDateCommentaire(dateCommentaire);
        } catch (ParseException e) {
            // Gérez les erreurs de conversion de la date
            return null;
        }
        // Récupérez l'utilisateur basé sur l'email
        User user = authService.findByEmail(userEmail);
        if (user != null) {
            commentaire.setUser(user);
        } else {
            return null; // Gérez ce cas en conséquence
        }

        // Récupérez le post basé sur l'ID du post
        Optional<PostEntity> postOptional = postService.getPostById(postId);
        if (postOptional.isPresent()) {
            commentaire.setPost(postOptional.get());
        } else {
            return null; // Gérez ce cas en conséquence
        }

        // Enregistrez le commentaire
        return commentaireService.ajouterCommentaire(commentaire);
    }

//    @PostMapping("/ajouter")
//    public Commentaire ajouterCommentaire(@RequestBody Commentaire commentaire) {
//        // Retrieve the user based on the email
//        User user = authService.findByEmail(commentaire.getUser().getEmail());
//        if (user != null) {
//            // Set the user in the Commentaire entity
//            commentaire.setUser(user);
//            System.out.println("commentaire de "+commentaire.getUser().getEmail());
//            /*commentaire.setDateCommentaire(new Date());
//            System.out.println(commentaire.getDateCommentaire());*/
//            // Save the comment
//            System.out.println("commentaire : " + commentaire.getContenu() + " ");
//            return commentaireService.ajouterCommentaire(commentaire);
//        } else {
//            return null; // You should handle this case accordingly
//        }
//    }

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
