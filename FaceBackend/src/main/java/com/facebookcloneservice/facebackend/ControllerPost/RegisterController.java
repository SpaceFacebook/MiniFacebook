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
@CrossOrigin(value = "http://localhost:3000")
public class RegisterController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        String email = user.getEmail();
        System.out.println("dateBirth: "+user.getDateBirth());
        // Check if the user with the same email already exists
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            System.out.println("User with this email already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("message", "User with this email already exists"));

        }

        // Create a new user
        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setSurName(user.getSurName());
        newUser.setEmail(email);
        newUser.setPassword(user.getPassword());
        newUser.setGender(user.getGender());
        newUser.setDateBirth(user.getDateBirth());
        newUser.setCoverImage("inconnu_coverture.png");
        if("FEMALE".equals(user.getGender().toString())) {
            System.out.println("user gender: "+user.getGender());
            newUser.setProfileImage("inconnu_femme.jpg");
        }else {
            newUser.setProfileImage("inconnu_man.jpg");
        }
        // Save the new user to the database
        userRepository.save(newUser);

        // Registration successful
        Map<String, String> response = new HashMap<>();
        response.put("message", "Registration successful");
        return ResponseEntity.ok(response);
    }
}

