package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.Commentaire;
import com.facebookcloneservice.facebackend.servicepost.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api/commentaires")
public class CommentaireController {
    @Autowired
    private CommentaireService commentaireService;

    @PostMapping("/ajouter")
    public Commentaire ajouterCommentaire(@RequestBody Commentaire commentaire) {
        System.out.println("commentaire : "+commentaire.getContenu()+" ");
        return commentaireService.ajouterCommentaire(commentaire);
    }

    @GetMapping("/post/{postId}")
    public List<Commentaire> obtenirCommentairesPourPost(@PathVariable String postId) {
        System.out.println("Appel de obtenirCommentairesPourPost avec postId : " + postId);
        List<Commentaire> commentaires = commentaireService.obtenirCommentairesPourPost(postId);
        System.out.println("Nombre de commentaires récupérés : " + commentaires.size());
        return commentaires;
    }


    // Autres méthodes de contrôleur pour gérer les commentaires
}
