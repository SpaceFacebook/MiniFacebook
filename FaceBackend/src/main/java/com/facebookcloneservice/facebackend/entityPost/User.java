package com.facebookcloneservice.facebackend.entityPost;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String surName;
    @Enumerated(EnumType.STRING)
    private UserGender gender;
    private String email;
    private String password;
    @Temporal(TemporalType.DATE)
    private Date dateBirth;
    @Lob
    @Column(length = 200000000)
    private String profileImage;
    @Lob
    @Column(length = 200000000)
    private String coverImage;
    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private Collection<PostEntity> postEntities;
}
