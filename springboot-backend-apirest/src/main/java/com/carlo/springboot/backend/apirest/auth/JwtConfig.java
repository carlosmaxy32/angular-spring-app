package com.carlo.springboot.backend.apirest.auth;

public class JwtConfig {
	public static final String LLAVE_SECRETA = "alguna.clave.secreta.123456789";
	public static final String RSA_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\r\n"
			+ "MIIEpAIBAAKCAQEAu5xCKMuCf88Am7bLgHIrAS6xMm7y8P11kmsaR9vGpylOX+Bn\r\n"
			+ "ukiWpY17MLg1lBbzuvS0rLzwhzBC5uANvWayO3oBbaqlVETPWvXnXp+Z2GSN9ATz\r\n"
			+ "RqnqUv7NM20lPKykg/+zhi9cgj21c04Pmy4grxmmCRqi+NL6UhYJM2DIzf2WiUh1\r\n"
			+ "sSaCkzWgs0bMHgb9G9UDlWW/PToiMJ+MSIeWvLyfH0/Efh+cxogqX49cF+Res2rZ\r\n"
			+ "EnUhaLp0LJYQKNTbVhm7DemY3XVp6ANtwfROtg+teB7v9rYpUrcS0gKY9IqM9yGV\r\n"
			+ "XYjkd2SwTIV8VWKEYlCdUBKoOoDnSr4UTs55XwIDAQABAoIBAGxB4adar6YCk+5G\r\n"
			+ "j61Bs/ENuXBJt2Q6TXK83MBkYIArBK+sdQ54Pn2vY0ucsEYQ7HmQJQWcTQslXSWO\r\n"
			+ "Wj9VmDlb0KEwnBBBWIm7ZdQjMoo8k/EgPiUjfTSBFXW8YIVfdds5XKVshOweoaq0\r\n"
			+ "e6rm9jM0EKwmM65zR8DAOHTuP1ElKx9lhwrWKWJd9xBWCarkM/TxmmKrJTzNwYJs\r\n"
			+ "bNUCsBZg3UJZtacl6VZf1kocYaPeIO/RYcf5dxOpoknESgMw0soD/8wuiy1Zdi6k\r\n"
			+ "MoBgG4mMFBRTccQ2lATeZNqHrePLkGOQAJ2/cUBvPOEcV153zy9c4TN6+OeCkYzy\r\n"
			+ "k1I8wLECgYEA6X94c0CLtblp8JAtl6s+TQPRbGakp6QqzSNUdOddsKOFcY6qpWgu\r\n"
			+ "rvCJHOjwjuOYfx00Gj6/oB8dDyFDYBrj6BZ51k9Wnp8KRLBPOJRA46yL1IVJUv/D\r\n"
			+ "nUWdPaHbeYZanWJ8m3qETmMTq2z8U4uUS+0iPZ3wEoXa+AWh92vupYkCgYEAzbC3\r\n"
			+ "K2LAxnhqNISt5Ul4jV9RzW5c9Y+9CLR3E9KYf0+TEaBGnre9kqEZRCI8E+VYj4Zi\r\n"
			+ "fgVM3pHR1MVq9uS3Zz5369ZrqjkUc8oxLWxzD8YdQlNj5IUcNGQBFCvnn2BeJJBw\r\n"
			+ "Hn2ondn81sHkEddX3a9kIgYWqv/COwJ/Zf9aVacCgYEA2L+/bB0qk5J+SRVNfVE1\r\n"
			+ "EADPUrUle4jlQm/dYnezfNkOco9g0RKY40Pdw7xoMfwL/1N4njRJZbX8H6NdC8Vq\r\n"
			+ "cnMKvmn/mldADOstXvQgGDh/xNPFcQqC52dLw36QYYraauaVjS55ytol1CfjQxp6\r\n"
			+ "mtCRzGjkBg3DaiCwbSD/8yECgYBgl3Ps89sDWNjHAOeInQ/3k6OejQ0qY+2pgNXK\r\n"
			+ "gUMLxhqSVGnVbwOfL/flfw4nabRE8h6ef26xtliLSooIly9pVHSMU40LyvJHzdN6\r\n"
			+ "OUtvROHIm9B1J+0uzSeUiWmj9mU/VnTQXMIqHowVbcfkePPSLuMe9yz98E0N2QZq\r\n"
			+ "p5eMUQKBgQCvU6o2b6LKkEqi0qshXI/uXLEJYe7FTd09MPh21Cbo1vyDBDl4AbUu\r\n"
			+ "mJzanKxzGjwpMuo/vooPbLgeI3R1tMZoBJxWowvo8w2hocYvSCvi+CoXS7hzS5un\r\n"
			+ "pWhRLuL9iz+rPqRUhpDFpmugUKa8bhuERZEI+2/8xEUOUizFraqrYA==\r\n"
			+ "-----END RSA PRIVATE KEY-----";
	
	public static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\r\n"
			+ "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu5xCKMuCf88Am7bLgHIr\r\n"
			+ "AS6xMm7y8P11kmsaR9vGpylOX+BnukiWpY17MLg1lBbzuvS0rLzwhzBC5uANvWay\r\n"
			+ "O3oBbaqlVETPWvXnXp+Z2GSN9ATzRqnqUv7NM20lPKykg/+zhi9cgj21c04Pmy4g\r\n"
			+ "rxmmCRqi+NL6UhYJM2DIzf2WiUh1sSaCkzWgs0bMHgb9G9UDlWW/PToiMJ+MSIeW\r\n"
			+ "vLyfH0/Efh+cxogqX49cF+Res2rZEnUhaLp0LJYQKNTbVhm7DemY3XVp6ANtwfRO\r\n"
			+ "tg+teB7v9rYpUrcS0gKY9IqM9yGVXYjkd2SwTIV8VWKEYlCdUBKoOoDnSr4UTs55\r\n"
			+ "XwIDAQAB\r\n"
			+ "-----END PUBLIC KEY-----";
}
