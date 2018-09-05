package com.conversorvideo.controller;

import com.conversorvideo.controller.requests.UploadResponse;
import com.conversorvideo.service.AmazonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Controller com endpoints de gestão de arquivos no amazon s3 .
 */
@RestController
@RequestMapping("/conversor/storage")
public class BucketController {

    private AmazonClient amazonClient;

    @Autowired
    BucketController(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }

    @PostMapping("/uploadFile")
    public ResponseEntity<UploadResponse> uploadFile(@RequestPart(value = "file") MultipartFile file) {
        UploadResponse response = new UploadResponse();
        response.setFileNameOnS3(amazonClient.uploadFile(file));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return amazonClient.deleteFileFromS3Bucket(fileUrl);
    }
}
