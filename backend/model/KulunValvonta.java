package fi.face.recognition.model;

import java.time.ZonedDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import fi.face.recognition.enums.AccessType;
import fi.face.recognition.enums.Status;

@Entity
public class KulunValvonta extends IdEntity {

	private ZonedDateTime aikaleima;
	@ManyToOne
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private User user;
	@ManyToOne
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Picture picture;
	@Lob
	private byte[] comparePicture;
	private String huomautus;
    @Enumerated(EnumType.STRING)
    private AccessType accessType;
    @Enumerated(EnumType.STRING)
	private Status status = Status.NEW;
    
    public ZonedDateTime getAikaleima() {
        return aikaleima;
    }
    public void setAikaleima(ZonedDateTime aikaleima) {
        this.aikaleima = aikaleima;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Picture getPicture() {
        return picture;
    }
    public void setPicture(Picture picture) {
        this.picture = picture;
    }
    public byte[] getComparePicture() {
        return comparePicture;
    }
    public void setComparePicture(byte[] comparePicture) {
        this.comparePicture = comparePicture;
    }
    public String getHuomautus() {
        return huomautus;
    }
    public void setHuomautus(String huomautus) {
        this.huomautus = huomautus;
    }
    public AccessType getAccessType() {
        return accessType;
    }
    public void setAccessType(AccessType accessType) {
        this.accessType = accessType;
    }
    public Status getStatus() {
        return status;
    }
    public void setStatus(Status status) {
        this.status = status;
    }

}
