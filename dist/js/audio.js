(function(root){
    function audio(){
        this.audio = new Audio();
        this.status = 'pause';
    }

    audio.prototype = {
        load(src){
            this.audio.src = src;
            this.audio.load();
        },
        play(){
            this.audio.play();
            this.status = 'play';
            
        },
        pause(){
            this.audio.pause();
            this.status = 'pause';
        },
        end(fn){
            this.audio.onended = fn;
        },
        playTo(time){
            this.audio.currentTime = time;
            console.log('跳转');
        }
    }

    root.music = new audio();
})(window.player || (window.player = {}))