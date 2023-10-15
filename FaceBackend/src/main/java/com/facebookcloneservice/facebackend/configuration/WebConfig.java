package com.facebookcloneservice.facebackend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.web.multipart.commons.CommonsMultipartResolver;
//import org.springframework.web.multipart.commons.MultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configuration pour servir les images de couverture depuis un répertoire local
        registry.addResourceHandler("/cover-images/**")
                .addResourceLocations("file:C:/Users/ATLAS PRO ELECTROµ/pictures/"); // Remplacez ce chemin par le chemin réel où sont stockées les images

        // Configuration pour servir les images de profil depuis un répertoire local
        registry.addResourceHandler("/profile-images/**")
                .addResourceLocations("file:C:/Users/ATLAS PRO ELECTROµ/pictures/"); // Remplacez ce chemin par le chemin réel où sont stockées les images de profil

    }

//    @Bean
//    public MultipartResolver multipartResolver() {
//        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
//        resolver.setMaxUploadSize(900000000); // Taille maximale des fichiers
//        resolver.setMaxInMemorySize(1000000); // Taille maximale en mémoire
//
//        return resolver;
//    }
}
