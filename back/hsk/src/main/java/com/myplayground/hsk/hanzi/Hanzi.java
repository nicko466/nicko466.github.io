package com.myplayground.hsk.hanzi;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.annotation.Generated;
import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "hanzi")
public class Hanzi {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String traditional;

    private String simplified;

    private String pinyin;

    private String definitions;

}
