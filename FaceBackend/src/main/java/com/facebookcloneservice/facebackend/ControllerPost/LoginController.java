package com.facebookcloneservice.facebackend.ControllerPost;

import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.modelpost.Post;
import com.facebookcloneservice.facebackend.postrepository.UserRepository;
import com.facebookcloneservice.facebackend.servicepost.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@RestController
    @CrossOrigin(value="http://localhost:3000")
    public class LoginController {
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private AuthService authService;
    private static final String BASE_URL = "http://localhost:8080/cover-images/"; // L'URL de base où sont stockées les images de couverture
    private static final String BASE_URL2 = "http://localhost:8080/profile-images/";

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
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Construct the full URL for the cover image
            String coverImageURL = BASE_URL + user.getCoverImage() + "?_=" + UUID.randomUUID().toString();
            String profileImageURL = BASE_URL2 + user.getProfileImage() + "?_=" + UUID.randomUUID().toString();
            user.setCoverImage(coverImageURL); // Mettez à jour le champ de l'image de couverture avec l'URL complet
            user.setProfileImage(profileImageURL);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    private static final String COVER_IMAGE_UPLOAD_DIR = "C://Users//ATLAS PRO ELECTROµ//pictures//";

    @PostMapping("/api/updateCoverImage")
    public ResponseEntity<String> updateCoverImage(@RequestParam String userEmail, @RequestParam("coverImage") MultipartFile coverImage) {
        try {
            // Check if the user exists
            Optional<User> userOptional = userRepository.findByEmail(userEmail);
            if (userOptional.isPresent()) {
                User user = userOptional.get();

                // Save the cover image
                String fileName =user.getId() + "_cover.jpg";
                File imageFile = new File(COVER_IMAGE_UPLOAD_DIR, fileName);
                coverImage.transferTo(imageFile);
                // Update the user's cover image
                user.setCoverImage(fileName);
                userRepository.save(user);

                return new ResponseEntity<>("Cover image updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            // Log the exception
            e.printStackTrace();

            return new ResponseEntity<>("Failed to update the cover image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private static final String PROFILE_IMAGE_UPLOAD_DIR = "C://Users//ATLAS PRO ELECTROµ//pictures//";
    @PostMapping("/api/updateProfileImage")
    public ResponseEntity<String> updateProfileImage(@RequestParam String userEmail, @RequestParam("profileImage") MultipartFile profileImage) {
        try {
            // Check if the user exists
            Optional<User> userOptional = userRepository.findByEmail(userEmail);
            if (userOptional.isPresent()) {
                User user = userOptional.get();

                // Save the profil image
                String fileName =user.getId() + "_profile.jpg";
                File imageFile = new File(PROFILE_IMAGE_UPLOAD_DIR, fileName);
                profileImage.transferTo(imageFile);

                // Update the user's profile image
                user.setProfileImage(fileName);
                userRepository.save(user);


                return new ResponseEntity<>("Cover image updated successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update the profile image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}


