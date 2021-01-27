(function(root){
    function index(len){
        this.currentIndex = 0;
        this.len = len;
    };
    index.prototype = {
        prev(){
            return this.get(-1);
        },
        next(){
            return this.get(+1);
        },
        get(direction){
            this.currentIndex = (this.len + direction + this.currentIndex) % this.len;
            return this.currentIndex;
        }
    }
    root.ctrolIndex = index;
})(window.player || (window.player = {}))