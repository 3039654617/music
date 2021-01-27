;(function($,player){
    function musicPlayer(){
        this.dataList = [];
    }

    musicPlayer.prototype = {
        init: function(){
            this.getData('../dataBase/data.json');
            this.getDom();
        },
        getDom(){
            this.ctrolBtns = document.querySelector('.ctrol').children;
            this.playBtn = document.querySelector('.play');
            this.wrap = document.querySelector('.wrap');
        },
        getData: function(url){
            const self = this;
            $.ajax({
                url:url,
                method: 'get',
                success: function(data){
                    self.indexCtrol = new player.ctrolIndex(data.length);
                    self.dataList = data;
                    self.playMusic();
                    self.listCtrol();
                    self.musicCtrol();
                    self.drag();
                   
                },
                error: function(){
                    console.log('请求错误');
                }
            })
        },
        playMusic(){
            const self = this;
            player.render(this.dataList[this.indexCtrol.currentIndex]);
            player.music.load(this.dataList[this.indexCtrol.currentIndex].audioSrc);
            player.progress.end(this.dataList[this.indexCtrol.currentIndex].duration);
            player.progress.getTime(self.dataList[self.indexCtrol.currentIndex].duration);
            
     
            if(player.music.status === 'play'){
                player.music.play();
               
                player.progress.change(this.dataList[this.indexCtrol.currentIndex].duration,0);
                this.playBtn.src = '../images/icon-pause.png';
            }else{
                this.playBtn.src = '../images/icon-play.png';
                 
            }
            player.music.end(function(){
                self.playMusic(self.indexCtrol.next());
                self.list.changeSelect(self.indexCtrol.currentIndex);
            })
        },
        musicCtrol(){
            const self = this;
            this.ctrolBtns[1].addEventListener('touchend',function(){  //上一首歌
                player.music.status = 'play';
                self.playMusic(self.indexCtrol.prev());
                self.list.changeSelect(self.indexCtrol.currentIndex);
            });

            this.ctrolBtns[2].addEventListener('touchend',function(){  //歌曲播放控制
                if(player.music.status === 'play'){
                    player.music.pause();
                    self.playBtn.src = '../images/icon-play.png';
                    player.progress.stop();
                }else{   
                    player.render(self.dataList[self.indexCtrol.currentIndex]);
                    player.music.load(self.dataList[self.indexCtrol.currentIndex].audioSrc);
                    player.progress.end(self.dataList[self.indexCtrol.currentIndex].duration);
                    player.music.play(); 
                   
                    player.progress.change(self.dataList[self.indexCtrol.currentIndex].duration);
                    self.playBtn.src = '../images/icon-pause.png';
                }
                player.music.end(function(){
                    self.playMusic(self.indexCtrol.next());
                })   
            });

            this.ctrolBtns[3].addEventListener('touchend',function(){  //下一首歌
                player.music.status = 'play';               
                self.playMusic(self.indexCtrol.next());
                self.list.changeSelect(self.indexCtrol.currentIndex);
            })
        },
        listCtrol(){
            const self = this;
            this.list = new player.listCtrol(this.dataList,this.wrap);
            this.ctrolBtns[4].addEventListener('touchend',function(){
                self.list.slidUp();
            })
        
            this.list.listSong.forEach((item, index) => {
                item.addEventListener('touchend', () => {
                    if(this.indexCtrol.currentIndex === index){
                        return;
                    }else{
                        player.music.status = 'play';
                        this.indexCtrol.currentIndex = index;
                        this.playMusic();
                        this.list.slidDown();
                    }
                });
                
            });
        },
        drag(){
           let drag = player.drag(document.querySelector('.circle'));
           drag.init();
           let self = this;
           drag.start = function(){
                player.progress.stop();
           }

           drag.move = function(per){
                player.progress.update(per);
           }

           drag.end = function(per){
                let currentTime = per * self.dataList[self.indexCtrol.currentIndex].duration;
                
                // player.music.status = 'play';
                // self.playMusic();
                // console.log(currentTime);

                // player.render(self.dataList[self.indexCtrol.currentIndex]);
                // player.music.load(self.dataList[self.indexCtrol.currentIndex].audioSrc);
                player.music.playTo(currentTime);
                // player.progress.end(self.dataList[self.indexCtrol.currentIndex].duration);
                player.music.play(); 
                player.progress.change(self.dataList[self.indexCtrol.currentIndex].duration,per);
                self.playBtn.src = '../images/icon-pause.png';
                console.log('拖拽结束');
           }
        }
    }

    var music = new musicPlayer();
    music.init();
})(window.Zepto, window.player);