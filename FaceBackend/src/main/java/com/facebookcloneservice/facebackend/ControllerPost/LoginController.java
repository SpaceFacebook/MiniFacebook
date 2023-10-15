package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.postrepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(value="http://localhost:3000")
public class LoginController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                // Authentification réussie
                Map<String, String> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("userName", user.getFirstName()); // Ajoutez le nom de l'utilisateur
                return ResponseEntity.ok(response);
            }
        }
        // Authentification échouée
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Login failed"));
    }
    @GetMapping("/api/userInfo")
    public ResponseEntity<User> getUserInfoByEmail(@RequestParam String userEmail) {
        System.out.println("email form frontend: "+userEmail);
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}