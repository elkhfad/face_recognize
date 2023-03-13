package fi.face.recognition.services;

import java.io.IOException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import fi.face.recognition.model.Picture;
import fi.face.recognition.model.User;
import fi.face.recognition.repository.PictureRepository;
import fi.face.recognition.repository.UserRepository;

@Component
public class PictureService {

	public static String UPLOAD_ROOT = "image/";

	@Autowired
	private PictureRepository pictureRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	public List<Picture> getPictures() {
		return pictureRepository.findByUserId(userDetailsServiceImpl.getCurrentUser().getId());
	}

	public Picture getPicture(Long id) {
		return pictureRepository.findById(id).get();
	}

	public void addPicture(Picture picture) {
		final UsernamePasswordAuthenticationToken userDetails = (UsernamePasswordAuthenticationToken) SecurityContextHolder
				.getContext().getAuthentication();
		final Optional<User> userFound = userRepository
				.findByUsername(((UserDetails) userDetails.getPrincipal()).getUsername());
		if (userFound.isPresent()) {
			picture.setUser(userFound.get());

			pictureRepository.save(picture);
		}
	}

	public void updatePicture(Long id, Picture picture) {
		final Optional<User> userFound = userRepository.findById(picture.getUser().getId());
		if (userFound.isPresent()) {
			pictureRepository.save(picture);
		}
	}

	public void removePicture(Long id) {
		try {
			pictureRepository.deleteById(id);
		} catch (Exception e) {
			pictureRepository.findById(id).ifPresent(picture -> {
				picture.setUser(null);
				pictureRepository.save(picture);
			});
		}
	}

	public Picture uploadImage(String description, String fileName, byte[] uploadPicture) throws IOException, IllegalArgumentException {
		final UsernamePasswordAuthenticationToken userDetails = (UsernamePasswordAuthenticationToken) SecurityContextHolder
				.getContext().getAuthentication();
		final User userFound = userRepository.findByUsername(((UserDetails) userDetails.getPrincipal()).getUsername())
				.orElseThrow(() -> new IllegalArgumentException("USER_NOT_LOGGED_IN"));

		final Picture pictureToUpdate = new Picture();
		pictureToUpdate.setPicture(Base64.getEncoder().encodeToString(uploadPicture));
		pictureToUpdate.setName(fileName);
		pictureToUpdate.setUser(userFound);
		pictureToUpdate.setDescription(description);
		pictureRepository.save(pictureToUpdate);
		return pictureToUpdate;

	}
}
