package com.facebookcloneservice.facebackend.entityPost;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contenu;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    private PostEntity post;
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCommentaire;


    // Getters et setters
}
