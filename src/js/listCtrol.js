(function(root){
    function listCtrol(data,wrap){
        this.list = document.createElement('ul');
        this.liTop = document.createElement('li');
        this.liBottom = document.createElement('li');
        
        this.liTop.innerHTML = '播放列表';
        this.liBottom.innerHTML = '关闭';
        this.list.appendChild(this.liTop);
        this.list.className = 'list';
        this.self = this;
        this.listSong = [];

        this.liBottom.addEventListener('touchend', () => {
            this.self.slidDown();
        })
        
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = item.name;
            this.listSong.push(li);
            // console.log(this.listSong);
            this.list.appendChild(li);
            this.listSong[index].addEventListener('touchend', () => {
                this.changeSelect(index);
            })
            this.changeSelect(0);
        });
        this.list.appendChild(this.liBottom)

        wrap.appendChild(this.list);

        this.listH = this.list.offsetHeight;
        this.list.style.transform = 'translateY('+this.listH+'px)';
    }

    listCtrol.prototype = {
        slidUp: function(){
            this.list.style.transition = '.3s';
            this.list.style.transform = 'translateY(0)';
        },
        slidDown: function(){
            this.list.style.transition = '.3s';
            this.list.style.transform = 'translateY('+this.listH+'px)';
        },
        changeSelect(index){
            for(let i = 0; i < this.listSong.length; i++){
                this.listSong[i].style.color = 'white';
            }
            this.listSong[index].style.color = 'rgba(200, 155, 218, .8)';
        }
    }



    root.listCtrol = listCtrol;
})(window.player);