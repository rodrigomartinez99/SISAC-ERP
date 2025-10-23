plugins {
	java
	id("org.springframework.boot") version "3.5.6"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
description = "Demo project for Spring Boot"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	
	// Security and JWT dependencies
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("io.jsonwebtoken:jjwt-api:0.12.3")
	implementation("io.jsonwebtoken:jjwt-impl:0.12.3")
	implementation("io.jsonwebtoken:jjwt-jackson:0.12.3")
	
	// MySQL Driver
	runtimeOnly("mysql:mysql-connector-java:8.0.33")
	
	// Password encoding
	implementation("org.springframework.security:spring-security-crypto")
	
	// Validation
	implementation("org.springframework.boot:spring-boot-starter-validation")
	
	// Apache POI (para Excel)
	implementation("org.apache.poi:poi-ooxml:5.2.5")
	
	// Google Guava
	implementation("com.google.guava:guava:33.0.0-jre")
	
	// Apache Commons
	implementation("org.apache.commons:commons-lang3:3.14.0")
	implementation("commons-io:commons-io:2.15.1")
	implementation("org.apache.commons:commons-csv:1.10.0") // Para CSV
	
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<JavaCompile> {
    options.compilerArgs.add("-parameters")
    options.encoding = "UTF-8"
}