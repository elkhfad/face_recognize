package fi.face.recognition.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import fi.face.recognition.model.Picture;

public interface PictureRepository extends CrudRepository<Picture, Long> {
	public List<Picture> findByUserId(long UserId);

	public Picture findByName(String name);

}
