package com.myplayground.hsk.hanzi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/hanzi")
class HanziController {

	@Autowired
	private IHanziService hanziService;

	@GetMapping("/{id}")
	public Hanzi getHanzi(@PathVariable Long id) {
		return hanziService.get(id);
	}

	@GetMapping("")
	public List<Hanzi> findAllByContains(@RequestParam("contains") @NotNull @NotEmpty String hanzis) {
		return hanziService.findAllByContains(hanzis);
	}

}
