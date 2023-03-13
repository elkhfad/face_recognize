package fi.face.recognition.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import fi.face.recognition.dto.UserDTO;
import fi.face.recognition.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    void save(UserDTO user);

}
