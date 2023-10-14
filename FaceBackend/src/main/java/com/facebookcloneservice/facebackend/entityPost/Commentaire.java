package com.facebookcloneservice.facebackend.entityPost;

import com.facebookcloneservice.facebackend.modelpost.Post;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contenu;

    @ManyToOne
    @JoinColumn(name = "post_id")

    private PostEntity post;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters et setters
}
