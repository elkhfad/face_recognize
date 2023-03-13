package fi.face.recognition.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fi.face.recognition.model.Picture;

import fi.face.recognition.services.PictureService;

@RestController
public class PictureController {

	@Autowired
	private PictureService pictureService;

	@RequestMapping("/pictures")
	public List<Picture> getPicture() {
		return pictureService.getPictures();
	}

	@RequestMapping(method = RequestMethod.POST, value = "/pictures")
	public List<Picture> addPicture(@RequestBody Picture picture) {
		pictureService.addPicture(picture);
		return pictureService.getPictures();
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/pictures/{id}")
	public void updatePicture(@PathVariable Long id, @RequestBody Picture picture) {
		pictureService.updatePicture(id, picture);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/pictures/{id}")
	public List<Picture> removePicture(@PathVariable Long id) {
		pictureService.removePicture(id);
		return pictureService.getPictures();
	} 	

	@RequestMapping(method = RequestMethod.POST, value = "/picture/upload/")
	public void  downloadImage(@RequestParam("image") MultipartFile image, @RequestParam("description")String description)
			throws IOException, IllegalArgumentException {		
		 pictureService.uploadImage(description,image.getOriginalFilename(), image.getBytes());
		 
	}

}
