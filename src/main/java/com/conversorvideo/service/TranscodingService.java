package com.conversorvideo.service;

import com.conversorvideo.controller.requests.TranscodingForm;
import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class TranscodingService {
    private OkHttpClient client;
    private static final MediaType JSON
            = MediaType.parse("application/json");

    @Value("${zencoderApiKey}")
    private String apiKey;

    public TranscodingService() {
        client = new OkHttpClient();
    }

    /**
     * Realiza comunicação com a Zenconder-API para realizar a conversão de um arquivo
     * @param transcodingForm {@link TranscodingForm}
     * @return Json contendo de saída do vídeo.
     */
    public String transcoding(TranscodingForm transcodingForm) {
        try {
            String json = getJsonZencodePostRequest(transcodingForm);
            RequestBody body = RequestBody.create(JSON, json);
            Request request = new Request.Builder()
                    .addHeader("Zencoder-Api-Key", apiKey)
                    .url("https://app.zencoder.com/api/v2/jobs")
                    .post(body)
                    .build();
            Response response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            return "Falha ao converter arquivo";
        }
    }

    /**
     *  Cria um objeto Json com as configurações que serão utilizadas pela api Zencoder
     * para realizar a conversão do arquivo de entrada
     * @param transcodingForm {@link TranscodingForm};
     * @return reprsentação do Json como uma string.
     */
    private String getJsonZencodePostRequest(TranscodingForm transcodingForm) {
        JSONObject transcodingBody = new JSONObject();
        transcodingBody.put("input", transcodingForm.getInput());
        JSONObject outputItem =  new JSONObject();
        outputItem.put("url", "s3://desafiosambatech/" + transcodingForm.getFilename());
        outputItem.put("credentials", "amazon_s3");
        outputItem.put("public", true);

        JSONArray outputs = new JSONArray();
        outputs.put(outputItem);


        transcodingBody.put("outputs", outputs);
        return  transcodingBody.toString();
    }


}
