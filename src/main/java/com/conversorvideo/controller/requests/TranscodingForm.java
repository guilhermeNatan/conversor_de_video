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
    private String filename;
    private String formatoDeSaida;

    /**
     * @return O nome do arquivo com a extenção de saída .
     */
    public String getFileWithOutputExtension() {
        if (filename != null) {
            String[] name = filename.split("\\.");
            return name[0] + "." + formatoDeSaida.toLowerCase();
        }
        return null;
    }

}
