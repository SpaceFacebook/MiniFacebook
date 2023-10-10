package com.facebookcloneservice.facebackend.postrepository;

import com.facebookcloneservice.facebackend.entityPost.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, String> {
    List<Commentaire> findByPostId(String postId);
}

