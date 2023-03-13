package fi.face.recognition.controller;

import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.face.recognition.model.KulunValvonta;
import fi.face.recognition.services.KulunValvontaService;

@RestController
public class KulunValvontaController {
    @Autowired
    private KulunValvontaService kulunValvontaService;

    @RequestMapping("/accessControll")
    public List<KulunValvonta> getKulunValvonnat() {
        List<KulunValvonta> items = kulunValvontaService.getKulunValvonta();
        items.sort(new Comparator<KulunValvonta>() {

            @Override
            public int compare(KulunValvonta o1, KulunValvonta o2) {
                return o2.getAikaleima().compareTo(o1.getAikaleima());
            }
        });
        return items;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/accessControll/{id}")
    public void removeKulunvalvonta(@PathVariable Long id) {
        kulunValvontaService.removeKulunvalvonta(id);
    }

    @PostMapping(value = "/accessControll/{accessControllId}/checked")
    public void removeKulunvalvonta(@PathVariable long accessControllId) {
        kulunValvontaService.markChecked(accessControllId);
    }
}
