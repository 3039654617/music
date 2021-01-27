(function(root){
    function progress(){
        this.DomCircle = document.querySelector('.circle');
        this.DomFore = document.querySelector('.foreground');
        this.DomMiddle = document.querySelector('.middle');
        this.DomRight = document.querySelector('.right');
        this.DomLeft = document.querySelector('.left');
        this.parentWidth = this.DomMiddle.offsetWidth;
        this.startTime = 0;
        this.lastPercent = 0;
        this.duration = 0;
        
    }         
    progress.prototype = {
        getTime(time){
            this.duration = time;   //在调用这个模块时先调用这个方法赋值
        },

        change(time,distinguish){
            let self = this;
            this.startTime = new Date().getTime();  //播放开始时时间戳
            
            cancelAnimationFrame(this.frame);
            
            this.lastPercent = distinguish === undefined ? this.lastPercent : distinguish;
            currentTime();
           
            function currentTime(){
                self.currentTime = new Date().getTime();  //当前时间戳
                let per = self.lastPercent + (self.currentTime - self.startTime) / (time * 1000);  
                // console.log( per );
                if(per < 1){
                    self.update(per);
                }else{
                    cancelAnimationFrame(self.frame);
                }
                self.frame = requestAnimationFrame(currentTime);       
            };  
        },
        update(per){
            this.DomLeft.innerHTML = this.formatTime( Math.round(per*this.duration));
            let left = Math.round(per * this.parentWidth);
            this.DomFore.style.width =  left + 'px'; 
            this.DomCircle.style.left = left + 'px';
        },
        stop(){
            cancelAnimationFrame(this.frame);
            this.pauseTime = new Date().getTime();  //暂停时间戳
            this.lastPercent += (this.pauseTime - this.startTime) / (this.duration * 1000);
        },
        end(duration){
            this.DomRight.innerHTML = this.formatTime(duration);
        },
        formatTime(time){
            // Math.round(time);
            let min = Math.floor(time / 60);
            let second = time % 60;
            min = min < 10 ? "0" + min : min;
            second = second < 10 ? "0" + second : second;
            return min + ':' +second; 
        }
    }

    function drag(dragObj){
        this.obj = dragObj;
        this.startPontX = 0;
        this.startLeft = 0;
        this.percent = 0;
        this.DomFore = document.querySelector('.foreground');
    }

    drag.prototype = {
        init(){
            let self = this;
            this.obj.style.left = '-4px';   //宽度为400px的屏幕，-1vw === -4px
            // console.log(this.obj.style.left.split('p')[0]);
            this.DomFore.style.width = '0px';

            this.obj.addEventListener('touchstart',function(ev){
                self.startPontX = ev.changedTouches[0].pageX;
                self.startLeft = parseFloat(self.obj.style.left.split('p')[0]);
                self.startWidth = parseFloat(self.DomFore.style.width.split('p')[0]);

                self.start && self.start();
            })

            this.obj.addEventListener('touchmove',function(ev){
                self.changeX = ev.changedTouches[0].pageX - self.startPontX;  //拖动的距离
                
                let circleLeft = self.startLeft + self.changeX;
                let DomForeWidth = self.startWidth + self.changeX;
                
                if(circleLeft < 0){
                    circleLeft = 0;
                }else if(circleLeft > this.offsetParent.offsetWidth){
                    circleLeft = this.offsetParent.offsetWidth;
                }
                if(DomForeWidth < 0){
                    DomForeWidth = 0;
                }else if(DomForeWidth > this.offsetParent.offsetWidth){
                    DomForeWidth = this.offsetParent.offsetWidth;
                }
                this.style.left = circleLeft + 'px';
                self.DomFore.style.width = DomForeWidth + 'px';

                self.percent = DomForeWidth / this.offsetParent.offsetWidth;
               
                self.move && self.move(self.percent);
                
            })

            this.obj.addEventListener('touchend',function(ev){
                self.end && self.end(self.percent);
            })
        }
    }

    function dragWay(obj){
        return new drag(obj);
    }

    root.progress = new progress();
    root.drag = dragWay;
})(window.player || (window.player = {}));