package fi.face.recognition.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;

@Component
public class FaceAWSCredentialsProvider implements AWSCredentialsProvider {

	@Value("${aws_secret_access_key}")
	private String awsSecretAccessKey;
	
	@Value("${aws_access_key_id}")
	private String awsAccessKeyId;
	
	AWSCredentials AWSCredentials = new AWSCredentials() {
		
		@Override
		public String getAWSSecretKey() {
			return awsSecretAccessKey;
		}
		
		@Override
		public String getAWSAccessKeyId() {
			return awsAccessKeyId;
		}
	};
	
	@Override
	public AWSCredentials getCredentials() {
		return AWSCredentials;
	}

	@Override
	public void refresh() {}

}
