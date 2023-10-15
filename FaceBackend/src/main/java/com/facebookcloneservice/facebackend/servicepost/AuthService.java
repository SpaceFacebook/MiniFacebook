package com.facebookcloneservice.facebackend.servicepost;

import com.facebookcloneservice.facebackend.entityPost.User;
import com.facebookcloneservice.facebackend.postrepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> authenticate(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public User findByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        // Check if the user exists
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            return null;
        }
    }

    public User updateCover(String email, String newCoverPhoto) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User userExist = userOptional.get();
            userExist.setCoverImage(newCoverPhoto);
            userRepository.save(userExist);
            return userExist;
        } else {
            return null;
        }
    }
}
