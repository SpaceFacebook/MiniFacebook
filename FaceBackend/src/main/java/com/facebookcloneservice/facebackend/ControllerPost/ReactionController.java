package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.Reaction;
import com.facebookcloneservice.facebackend.entityPost.ReactionType;
import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.servicepost.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reaction")
@CrossOrigin(value = "http://localhost:3000")
public class ReactionController {

    @Autowired
    private ReactionService reactionService;
    @PostMapping("/{postId}")
    public ResponseEntity<String> reactToPost(
            @PathVariable String postId,
            @RequestBody Reaction reaction
    ) {
        User user = reaction.getUser();
        ReactionType reactionType = reaction.getReactionType();
        System.out.println("reactionType: " + reactionType);

        // Vérifier si l'utilisateur a déjà réagi au post
        Reaction existingReaction = reactionService.getReactionByUserAndPost(user.getEmail(), String.valueOf(postId));

        if (existingReaction != null) {
            // L'utilisateur a déjà réagi, mettre à jour sa réaction
            existingReaction.setReactionType(reactionType);
            reactionService.updateReaction(existingReaction);
        } else {
            // L'utilisateur n'a pas encore réagi, enregistrer la nouvelle réaction
            reactionService.reactToPost(user.getEmail(), String.valueOf(postId), reactionType);
        }

        return ResponseEntity.ok("Réaction enregistrée avec succès.");
    }
    @GetMapping("/{postId}/reaction-count")
    public ResponseEntity<Map<String, Integer>> getReactionCountForPost(@PathVariable String postId) {
        int likeCount = reactionService.getReactionCount(postId, ReactionType.LIKE);
        int dislikeCount = reactionService.getReactionCount(postId, ReactionType.DISLIKE);

        Map<String, Integer> reactionCounts = new HashMap<>();
        reactionCounts.put("like", likeCount);
        reactionCounts.put("dislike", dislikeCount);

        return ResponseEntity.ok(reactionCounts);
    }


}