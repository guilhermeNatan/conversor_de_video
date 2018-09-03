package com.conversorvideo.controller;

import com.conversorvideo.controller.requests.TranscodingForm;
import com.conversorvideo.service.TranscodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * https://s3.sa-east-1.amazonaws.com/desafiosambatech/1535921522513-tela_celular.mov
 */
@RestController
@RequestMapping("/transcoding")
public class TranscodingController {
    @Autowired
    private  TranscodingService transcodingService;

    @PostMapping
    public String transcodingFile(@RequestBody TranscodingForm transcodingForm){
        return  transcodingService.transcoding(transcodingForm);
    }
}
