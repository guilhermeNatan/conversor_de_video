package com.conversorvideo.controller.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadResponse {
    private String fileNameOnS3;
}
