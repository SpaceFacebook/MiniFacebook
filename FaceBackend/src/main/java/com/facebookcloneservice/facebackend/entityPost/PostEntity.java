package com.facebookcloneservice.facebackend.entityPost;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.GenericGenerators;


@Entity
@Table(name="posts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name="uuid", strategy="uuid2")
    private String id;
    @Lob
    private String post;
    private String name;
    private String email;
    @Lob
    @Column(length = 200000)
    private String image;
    @Lob
    private String profilePic;
    private String timeStamp;



}
