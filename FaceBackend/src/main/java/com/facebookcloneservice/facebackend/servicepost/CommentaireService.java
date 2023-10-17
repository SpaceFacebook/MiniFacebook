package com.facebookcloneservice.facebackend.servicepost;

import com.facebookcloneservice.facebackend.entityPost.Commentaire;
import com.facebookcloneservice.facebackend.postrepository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireService {
    @Autowired
    private CommentaireRepository commentaireRepository;

    public CommentaireService(CommentaireRepository commentaireRepository) {
        this.commentaireRepository = commentaireRepository;
    }

    public Commentaire ajouterCommentaire(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    public List<Commentaire> obtenirCommentairesPourPost(String id) {
        System.out.println("l'id est "+id);
        return commentaireRepository.findByPostId(id);
    }
    public int getCommentCountForPost(String postId) {
        return commentaireRepository.countByPostId(postId);
    }

    // Autres méthodes pour la gestion des commentaires
}
