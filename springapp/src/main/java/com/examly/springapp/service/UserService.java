package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.model.UserRole;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register
    public User registerUser(User user) throws Exception {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new Exception("Username already taken");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email already taken");
        }

        if (user.getRole() == null) {
            user.setRole(UserRole.DONOR); // default role
        }

        return userRepository.save(user);
    }

    // Login
    public User loginUser(String username, String password) throws Exception {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            if (user.get().getPasswordHash().equals(password)) {
                return user.get();
            } else {
                throw new Exception("Invalid password");
            }
        } else {
            throw new Exception("User not found");
        }
    }

    // Get All
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get By ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Get By Username
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Update
    public User updateUser(Long id, User updatedUser) throws Exception {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPasswordHash(updatedUser.getPasswordHash());
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new Exception("User not found"));
    }

    // Delete
    public void deleteUser(Long id) throws Exception {
        if (!userRepository.existsById(id)) {
            throw new Exception("User not found");
        }
        userRepository.deleteById(id);
    }
}
