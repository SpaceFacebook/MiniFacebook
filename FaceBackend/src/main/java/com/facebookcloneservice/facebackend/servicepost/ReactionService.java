package com.facebookcloneservice.facebackend.servicepost;

import com.facebookcloneservice.facebackend.entityPost.PostEntity;
import com.facebookcloneservice.facebackend.entityPost.Reaction;
import com.facebookcloneservice.facebackend.entityPost.ReactionType;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.postrepository.PostEntityRepository;
import com.facebookcloneservice.facebackend.postrepository.ReactionRepository;
import com.facebookcloneservice.facebackend.postrepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReactionService {

    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostEntityRepository postRepository;

    public void reactToPost(String userEmail, String postId, ReactionType reactionType) {
        // Récupérez l'utilisateur à partir de l'ID de l'utilisateur.
        User user = userRepository.findByEmail(userEmail).orElse(null);

        // Récupérez le post à partir de l'ID du post.
        PostEntity post = postRepository.findById(String.valueOf(postId)).orElse(null);

        if (user != null && post != null) {
            // Enregistrez la réaction dans la base de données.
            Reaction reaction = new Reaction();
            reaction.setUser(user);
            reaction.setPost(post);
            reaction.setReactionType(reactionType);
            reactionRepository.save(reaction);
        } else {
            // Gérez le cas où l'utilisateur ou le post n'est pas trouvé.
        }
    }
    public Reaction getReactionByUserAndPost(String userEmail, String postId) {
        return reactionRepository.findUserReactionByPostIdAndUserEmail(postId, userEmail);
    }

    public void updateReaction(Reaction reaction) {
        reactionRepository.save(reaction);
    }
    public int getReactionCount(String postId, ReactionType reactionType) {
        return reactionRepository.countByPostIdAndReactionType(postId, reactionType);
    }

}
