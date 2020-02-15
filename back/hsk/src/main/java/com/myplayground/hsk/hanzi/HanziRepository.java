package com.myplayground.hsk.hanzi;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HanziRepository extends CrudRepository<Hanzi, Long> {

    @Query("select h from Hanzi h where h.simplified = ?1")
    List<Hanzi> findAllByContains(String hanzis);
}
