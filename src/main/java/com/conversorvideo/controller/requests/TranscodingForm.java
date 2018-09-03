package com.conversorvideo.controller.requests;

import lombok.Getter;
import lombok.Setter;

/**
 * Objeto que representa o request body para
 * o endpoint {@link com.conversorvideo.controller.TranscodingController#transcodingFile(TranscodingForm)}
 */
@Getter
@Setter
public class TranscodingForm {

    private String input;
    private String filename;


}
