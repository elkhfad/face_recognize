package fi.face.recognition.services;

import java.nio.ByteBuffer;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
import com.amazonaws.services.rekognition.model.CompareFacesRequest;
import com.amazonaws.services.rekognition.model.CompareFacesResult;
import com.amazonaws.services.rekognition.model.ComparedFace;
import com.amazonaws.services.rekognition.model.Image;
import com.amazonaws.util.IOUtils;


import fi.face.recognition.enums.AccessType;
import fi.face.recognition.model.Picture;
import fi.face.recognition.model.User;

@Service
public class FaceRecognitionService {
    private final static Float SIMILARITY_THRESHOLD = 70F;

    @Autowired
    private FaceAWSCredentialsProvider faceAWSCredentialsProvider;
    @Autowired
    private KulunValvontaService kulunValvontaService;
    @Autowired
    private EmailService emailService;

    @Value("${aws_region}")
    private String awsRegion;

    public AccessType faceRecognition(MultipartFile file, User user) throws Exception {
        ByteBuffer userImageBytes = null;
        Image cameraSourceImage = null;

        AmazonRekognition rekognitionClient = AmazonRekognitionClientBuilder.standard().withRegion(awsRegion)
                .withCredentials(faceAWSCredentialsProvider).build();

        try {
            ByteBuffer sourceImageBytes = ByteBuffer.wrap(IOUtils.toByteArray(file.getInputStream()));
            cameraSourceImage = new Image().withBytes(sourceImageBytes);

            // Loop
            for (Picture picture : user.getPictures()) {
                if (picture.getPicture() == null) {
                    continue;
                }
                try {
                    userImageBytes = ByteBuffer.wrap(Base64.getDecoder().decode(picture.getPicture()));
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println("Failed to load target images: " + picture.getName());
                    continue; // if error inform and continue
                }
                Image userImage = new Image().withBytes(userImageBytes);
                CompareFacesRequest request = new CompareFacesRequest()
                        .withSourceImage(cameraSourceImage)
                        .withTargetImage(userImage)
                        .withSimilarityThreshold(SIMILARITY_THRESHOLD);

                try {
                    // Call operation
                    CompareFacesResult compareFacesResult = rekognitionClient.compareFaces(request);
                    List<ComparedFace> unmatched = compareFacesResult.getUnmatchedFaces();
                    if (unmatched.size() == 0) {
                        kulunValvontaService.register(user, "OK", sourceImageBytes.array(), picture, ZonedDateTime.now(), AccessType.ACCESS_GRANTED);
                        return AccessType.ACCESS_GRANTED;
                    }
                } catch (Exception e) {
                    System.err.println("Failed to compare image");
                    e.printStackTrace();
                }
            }
            kulunValvontaService.register(user, "NO MATCH", sourceImageBytes.array(), null, ZonedDateTime.now(), AccessType.ACCESS_DENIED);
            emailService.sendEmail(user.getEmail());
       } catch (Exception e) {
            System.err.println("Failed to load source image");
            e.printStackTrace();
            kulunValvontaService.register(user, "VIRHE", new byte[] {}, null, ZonedDateTime.now(), AccessType.MALFUNCTION);
            return AccessType.MALFUNCTION; // source image error inform but do not exit;
        } finally {
            rekognitionClient.shutdown();
        }
        return AccessType.ACCESS_DENIED;
      
    }
}
