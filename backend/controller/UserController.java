
package fi.face.recognition.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.face.recognition.dto.UserDTO;
import fi.face.recognition.model.User;
import fi.face.recognition.repository.UserRepository;
import fi.face.recognition.services.UserDetailsServiceImpl;

@RestController
public class UserController {
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/users")
    public UserDTO getUser() {
        Optional<User> user = userRepository.findById(userDetailsServiceImpl.getCurrentUser().getId());
        return convertToDTO(user.get());
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/update/{id}")
    public void updateUser(@RequestBody UserDTO userDTO, @PathVariable String id) {
        final Optional<User> persistedUser = userRepository.findById(Long.valueOf(id));
        persistedUser.ifPresent(userToUpdate -> {
            userToUpdate.setEmail(userDTO.email);
            userToUpdate.setName(userDTO.name);
            userToUpdate.setUsername(userDTO.username);
            userDetailsServiceImpl.updateUser(userToUpdate);
        });
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(user);
    }

}
