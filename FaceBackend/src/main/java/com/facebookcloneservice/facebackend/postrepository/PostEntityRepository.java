package com.facebookcloneservice.facebackend.postrepository;


import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostEntityRepository extends JpaRepository<PostEntity,String> {
}
