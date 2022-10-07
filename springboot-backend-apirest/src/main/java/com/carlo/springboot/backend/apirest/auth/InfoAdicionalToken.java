package com.carlo.springboot.backend.apirest.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.carlo.springboot.backend.apirest.models.entity.User;
import com.carlo.springboot.backend.apirest.models.services.IUserService;

@Component
public class InfoAdicionalToken implements TokenEnhancer {

	@Autowired
	private IUserService userService;
	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		
		User user = userService.findByUsername(authentication.getName());
		
		Map<String, Object> infoMap = new HashMap<>();
		infoMap.put("info adicional", "Hola: ".concat(authentication.getName()));
		infoMap.put("nombre", user.getName());
		infoMap.put("apellido", user.getLastname());
		infoMap.put("email", user.getEmail());
		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(infoMap);
		return accessToken;
	}

}
