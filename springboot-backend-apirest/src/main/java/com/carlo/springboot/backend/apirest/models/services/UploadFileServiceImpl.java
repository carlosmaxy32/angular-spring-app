package com.carlo.springboot.backend.apirest.models.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileServiceImpl implements IUploadFileService {
	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImpl.class);
	private final static String DIRECTORIO_UPLOAD ="D:\\Archivos de programa\\eclipse-workspace\\springboot-backend-apirest\\uploads";
	@Override
	public Resource cargar(String nameFile) throws MalformedURLException {
		Path pathFile = getPath(nameFile);
		Resource resource = new UrlResource(pathFile.toUri());
		log.info(pathFile.toString());

				
		if(!resource.exists() && !resource.isReadable()) {
			pathFile = Paths.get("src/main/resources/static/images").resolve("user_icon.png").toAbsolutePath();
			resource= new UrlResource(pathFile.toUri());
			log.error("Error no se puedo cargar la imagen: " + nameFile);
		}
		return resource;
	}

	@Override
	public String copiar(MultipartFile file) throws IOException {
		String nameFile = UUID.randomUUID().toString()+"_"+file.getOriginalFilename().replace(" ", "");
		Path pathFile = getPath(nameFile);
		log.info(pathFile.toString());
		Files.copy(file.getInputStream(), pathFile);
		return nameFile;
	}

	@Override
	public boolean eliminar(String nameFile) {
		if(nameFile != null && nameFile.length() > 0) {
			Path pathLastPicture = getPath(nameFile);
			File fileLastPicture = pathLastPicture.toFile();
			if(fileLastPicture.exists() && fileLastPicture.canRead()) {
				fileLastPicture.delete();
				return true;
			}
		}		
		return false;
	}

	@Override
	public Path getPath(String nameFile) {
		return Paths.get(DIRECTORIO_UPLOAD).resolve(nameFile).toAbsolutePath();
	}

}
