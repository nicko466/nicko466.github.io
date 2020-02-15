package com.myplayground.hsk.hanzi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HanziService implements IHanziService {

    @Autowired
    private HanziRepository repository;

    @Override
    public Hanzi get(Long id) {
        return this.repository.findById(id).orElse(new Hanzi());
    }

    @Override
    public List<Hanzi> findAllByContains(String hanzis) {
        return this.repository.findAllByContains(hanzis);
    }
}
