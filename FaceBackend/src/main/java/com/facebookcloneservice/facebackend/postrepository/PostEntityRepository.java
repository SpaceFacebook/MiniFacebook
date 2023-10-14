package com.facebookcloneservice.facebackend.postrepository;


import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import com.facebookcloneservice.facebackend.entityPost.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostEntityRepository extends JpaRepository<PostEntity,String> {
    List<PostEntity> findByUser(User user);

    List<PostEntity> findByEmail(String email);
}
