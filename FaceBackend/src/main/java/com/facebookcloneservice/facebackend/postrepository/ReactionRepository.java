package com.facebookcloneservice.facebackend.postrepository;

import com.facebookcloneservice.facebackend.entityPost.Reaction;
import com.facebookcloneservice.facebackend.entityPost.ReactionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction,Long> {
    Reaction findUserReactionByPostIdAndUserEmail(String postId, String userEmail);
    int countByPostIdAndReactionType(String postId, ReactionType reactionType);

}
