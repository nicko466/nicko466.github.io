package com.myplayground.hsk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("com.myplayground.hsk.hanzi")
@SpringBootApplication
public class HskApplication {

	public static void main(String[] args) {
		SpringApplication.run(HskApplication.class, args);
	}

}
