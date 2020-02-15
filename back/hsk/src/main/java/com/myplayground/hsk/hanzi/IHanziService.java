package com.myplayground.hsk.hanzi;

import java.util.List;

public interface IHanziService {

    Hanzi get(Long id);

    List<Hanzi> findAllByContains(String hanzis);
}
