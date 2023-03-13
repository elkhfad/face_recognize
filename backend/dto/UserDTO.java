package fi.face.recognition.dto;

import fi.face.recognition.model.User;

public class UserDTO{
    public Long id;
    public String name;
    public String email;
    public String username;

    
    public UserDTO() {

    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.username = user.getUsername();
    }

    public User build() {
        User userEntity = new User();
        userEntity.setId(id);
        userEntity.setName(name);
        userEntity.setEmail(email);
        userEntity.setUsername(username);
        return userEntity;
    }

}
