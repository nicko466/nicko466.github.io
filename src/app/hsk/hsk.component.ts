import { Component, OnInit } from '@angular/core';
import {RepoService} from "../../services/repo.service";
import {JsonConvert} from "json2typescript";
import {ApiHsk} from "../../models/api/hsk";
import {ApiWord} from "../../models/api/word";

@Component({
  selector: 'app-hsk',
  templateUrl: './hsk.component.html',
  styleUrls: ['./hsk.component.scss']
})
export class HskComponent implements OnInit {

  private text: string;
  private words: string[];
  private apiHsk: ApiHsk;

  public pynyin: string;
  public translate: string;

  constructor(private repoService: RepoService) { }

  ngOnInit() {

    this.text =  `森林里住着好多小动物，有聪明的狐狸、可爱的小兔子、善良的大象、慈祥的老猴子……还有一只爱美的小刺猬。小刺猬觉得呀，自己是这个森林里最漂亮的。
    有一次，小刺猬正在河边洗脸，听到不远处大家的欢笑声。走近一看，发现平时不起眼的山羊姐姐烫了头发，变得非常美丽，大家正在夸奖她呢。小刺猬不高兴了，心里想：我也要去烫头发，让自己变得更美丽。
    第二天，小刺猬就来到了森林美发店，跟美发师孔雀阿姨说：“阿姨，我想烫一个山羊姐姐那样的头发，一个圆圈一个圆圈的，好像方便面一样，可漂亮了。”
    孔雀阿姨说：“你想好了吗？真的想烫头发？”
  “是啊，美丽的孔雀阿姨，您就给我烫吧。”小刺猬着急地说。
    于是，孔雀就一下一下地卷起了小刺猬的刺。小刺猬可紧张了，一直也不敢看镜子里的自己。等烫完了，小刺猬看着镜子里的自己，每一根刺都卷卷的，真的漂亮极了。
    小刺猬高兴地离开了美发店，回家的路上，她想象着大家夸她漂亮的样子，心里别提多开心了。可是，走到一半的时候，大灰狼从草丛里跳了出来，他流着口水说：“小刺猬，平时你的刺尖尖的，我不敢咬你，但是今天你的刺都变圆了，我就能舒舒服服地吃你了！哈哈哈哈”小刺猬吓得赶紧缩成一团——没有了尖尖的刺，大灰狼不再怕他了。
    小刺猬吓得哭了起来。还好，大象叔叔和猴子爷爷听到哭声赶跑了大灰狼，救了小刺猬。
    猴子爷爷抱着吓坏了的小刺猬，慢慢地说：“傻孩子，你的头发和山羊的头发不一样，你的刺能够保护你不被伤害，还能用来搬运自己喜欢的果子。如果把自己变成别人的样子，就过不了自己的生活，再漂亮也不是自己了。”
    小刺猬明白了，她马上回到美发店，把自己的刺变回原来的样子。从镜子里看着变回来的自己，她又可以保护自己了，她又是那个最漂亮的小刺猬了。`

    this.words = this.text.match(/./g);

    this.repoService.getHSKJSON("6")
      .subscribe(
      (data: any) => {
        console.log(data);

        let jsonConvert: JsonConvert = new JsonConvert();
        this.apiHsk = jsonConvert.deserializeObject(data, ApiHsk);

        console.log(this.apiHsk);

      },
      (error) => console.error(`Failed to get data due to ${error} `)
    );



  }

  hideHanzi() {

  }

  displayHanzi(i: number) {
    console.error(this.words[i]);
    let found = this.apiHsk.words.find((word: ApiWord) => word.hanzi === this.words[i]);

    if (found == null) {

    }

    console.error(found);
  }

  private getHskWord(indexWord: number, ): ApiWord {


    return null;
  }
}
