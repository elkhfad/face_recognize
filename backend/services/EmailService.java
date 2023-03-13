package fi.face.recognition.services;

import java.util.Properties;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import fi.face.recognition.model.User;

@Service("emailService")
public class EmailService {

    public MimeMessage sendEmail(String email) {
        Properties properties = System.getProperties();
     /* Käyttäkää smtp.kolumbus.fi jos on elisa, vaihtakaa tuo mail.smtp.host
         voitte tarkistaa omanna osoitteessa www.whoismyisp.org/*/

        //properties.setProperty("mail.smtp.host", "mail.inet.fi");
        properties.setProperty("mail.smtp.host", "mail.inet.fi");

        properties.setProperty("mail.smtp.port", "25");

        Session session = Session.getDefaultInstance(properties);
        MimeMessage message = new MimeMessage(session);
        try {
            //MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("fadi.elkhouri86@gmail.com"));
            message.setRecipient(RecipientType.TO, new InternetAddress(email));
            message.setSubject("Face Recognized");
            message.setText("Havaittiin tuntematon henkilö!\n\n"
                    + "Lisää tietoja löytyy Access Controllista\n\n\n" +
                    "Terveisin\n\n Face Recognized team");
            // Send message
            Transport.send(message);
            System.out.println("Sent message successfully....");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return message;
    }

}
