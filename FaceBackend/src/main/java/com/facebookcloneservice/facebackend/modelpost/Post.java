package com.facebookcloneservice.facebackend.modelpost;


import com.facebookcloneservice.facebackend.entityPost.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Post {
    private String id;

    private String post;
    private String name;
    private String email;
    @Lob
    @Column(length = 2000)
    private String image;
    private String profilePic;
    private String timeStamp;
    @Lob
    @Column(length = 2000)
    private String file;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
