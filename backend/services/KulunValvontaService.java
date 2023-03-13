package fi.face.recognition.services;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.face.recognition.enums.Status;
import fi.face.recognition.enums.AccessType;
import fi.face.recognition.model.KulunValvonta;
import fi.face.recognition.model.Picture;
import fi.face.recognition.model.User;
import fi.face.recognition.repository.KulunValvontaRepository;

@Component
public class KulunValvontaService {

    @Autowired
    private KulunValvontaRepository kulunValvontaRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    public List<KulunValvonta> getKulunValvonta() {
        return kulunValvontaRepository.findByUserId(userDetailsServiceImpl.getCurrentUser().getId());
    }

    public KulunValvonta getPicture(Long id) {
        return kulunValvontaRepository.findById(id).get();
    }

    public void removeKulunvalvonta(Long id) {
        kulunValvontaRepository.deleteById(id);
    }

    public void register(User user, String huomautus, byte[] comparePicture, Picture picture, ZonedDateTime aikaleima, AccessType status) {
        KulunValvonta kulunValvonta = new KulunValvonta();
        kulunValvonta.setAikaleima(aikaleima);
        kulunValvonta.setComparePicture(comparePicture);
        kulunValvonta.setHuomautus(huomautus);
        kulunValvonta.setPicture(picture);
        kulunValvonta.setUser(user);
        kulunValvonta.setAccessType(status);
        kulunValvontaRepository.save(kulunValvonta);
    }

    public void markChecked(long accessControllId) {
        kulunValvontaRepository.findById(accessControllId).ifPresent(kulunValvonta -> {
            kulunValvonta.setStatus(Status.ACKNOWLEDGED);
            kulunValvontaRepository.save(kulunValvonta);
        });
    }

}
