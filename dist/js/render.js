(function(root){
    function renderImg(src){
        root.blurImg(src);  //给背景添加高斯模糊背景
        const img = document.getElementById('head');
        img.src = src;
    }

    function renderInfo(data){
        const songInfo = document.querySelector('.songInfo').children;
        songInfo[0].innerHTML = data.name;
        songInfo[1].innerHTML = data.singer;
        songInfo[2].innerHTML = data.album;
    }

    function renderLike(like){
        const songLike = document.querySelector('.like');
        if(like === "true"){
            songLike.src = '../images/icon-like-solid.png'
        }else{
            songLike.src = '../images/icon-like.png'
        }
    }
    root.render = function(data){
        renderImg(data.image);
        renderInfo(data);
        renderLike(data.isLike)
    };
})(window.player || (window.player = {}));