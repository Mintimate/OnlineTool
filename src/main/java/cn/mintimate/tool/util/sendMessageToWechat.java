package cn.mintimate.tool.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.io.IOException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/**
 * @author Mintimate
 */
public class sendMessageToWechat {
    static final String GET_ACCESS_TOKEN_URL = "https://qyapi.weixin.qq.com/cgi-bin/gettoken";

    static final String SEND_MESSAGE_URL = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=";

    static final String WECOM_CID = "ww96c0863b5552bbcb";

    static final String WECOM_SECRET = "RVbS4iE3GjAywRNJ5OC3N8p0wGuzDZ5lH13Me6JFPZo";

    static final String AGENT_ID = "1000002";

    static final String TOUSER = "@all";

    static final int ERROR_CODE = 0;

    static final int SUCCESS_CODE = 0;

    static int STATUS_CODE = 0;

    private static String HttpRestClient(String url, HttpMethod method, JSONObject json) throws IOException {
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

    private static String getAccessToken() {
        HttpMethod method = HttpMethod.POST;
        JSONObject json = new JSONObject();
        json.put("corpid", "ww96c0863b5552bbcb");
        json.put("corpsecret", "RVbS4iE3GjAywRNJ5OC3N8p0wGuzDZ5lH13Me6JFPZo");
        String result = null;
        try {
            result = HttpRestClient("https://qyapi.weixin.qq.com/cgi-bin/gettoken", method, json);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject obj = JSON.parseObject(result);
        String access_token = (String) obj.get("access_token");
        return access_token;
    }

    private static int sendMessage(String sendText, String access_token) {
        String url = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + access_token;
        HttpMethod method = HttpMethod.POST;
        JSONObject json = new JSONObject();
        JSONObject jsonText = new JSONObject();
        jsonText.put("content", sendText);
        json.put("touser", "@all");
        json.put("agentid", "1000002");
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
        return STATUS_CODE;
    }

    public static int sendText(String Text) {
        if (Text == null)
            return 0;
        String access_token = getAccessToken();
        if (access_token == null || access_token.equals(""))
            return 0;
        sendMessage(Text, access_token);
        return STATUS_CODE;
    }
}
