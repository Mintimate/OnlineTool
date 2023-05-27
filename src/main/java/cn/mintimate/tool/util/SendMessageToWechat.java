package cn.mintimate.tool.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/**
 * 适配发送信息到企业微信
 * @author Mintimate
 */
@Component
public class SendMessageToWechat {
    static final String GET_ACCESS_TOKEN_URL = "https://qyapi.weixin.qq.com/cgi-bin/gettoken";

    static final String SEND_MESSAGE_URL = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=";

    @Value("${wcon.wecom_cid}")
    private String WECOM_CID;

    @Value("${wcon.wecom_secret}")
    private String WECOM_SECRET;

    @Value("${wcon.agent_id}")
    private String AGENT_ID;

    @Value("${wcon.touser}")
    private String TOUSER;

    static final int ERROR_CODE = 0;

    static final int SUCCESS_CODE = 0;

    static int STATUS_CODE = 0;

    private String HttpRestClient(String url, HttpMethod method, JSONObject json) throws IOException {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(10000);
        requestFactory.setReadTimeout(10000);
        RestTemplate client = new RestTemplate((ClientHttpRequestFactory) requestFactory);
        HttpHeaders headers = new HttpHeaders();
        MediaType type = MediaType.parseMediaType("application/json;charset=UTF-8");
        headers.setContentType(type);
        HttpEntity<String> requestEntity = new HttpEntity(json.toString(), (MultiValueMap) headers);
        ResponseEntity<String> response = client.exchange(url, method, requestEntity, String.class, new Object[0]);
        return (String) response.getBody();
    }

    private String getAccessToken() {
        HttpMethod method = HttpMethod.POST;
        JSONObject json = new JSONObject();
        json.put("corpid", WECOM_CID);
        json.put("corpsecret", WECOM_SECRET);
        String result = null;
        try {
            result = HttpRestClient(GET_ACCESS_TOKEN_URL, method, json);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject obj = JSON.parseObject(result);
        return (String) obj.get("access_token");
    }

    private void sendMessage(String sendText, String access_token) {
        String url = SEND_MESSAGE_URL+ access_token;
        HttpMethod method = HttpMethod.POST;
        JSONObject json = new JSONObject();
        JSONObject jsonText = new JSONObject();
        jsonText.put("content", sendText);
        json.put("touser", TOUSER);
        json.put("agentid", AGENT_ID);
        json.put("msgtype", "text");
        json.put("text", jsonText);
        try {
            String result = HttpRestClient(url, method, json);
            JSONObject obj = JSON.parseObject(result);
            if (((Integer) obj.get("errcode")).intValue() == 200)
                STATUS_CODE = 0;
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendText(String Text) {
        if (Text == null)
            return;
        String access_token = getAccessToken();
        if (access_token == null || access_token.equals(""))
            return;
        sendMessage(Text, access_token);
    }
}
