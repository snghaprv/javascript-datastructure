class DSU {
    constructor(noOfVertex) {
        this.parent = new Array(noOfVertex+1)
        this.size = new Array(noOfVertex+1)
        this.rank = new Array(noOfVertex+1)

        for(let i=0; i< this.parent.length; i++){
            this.parent[i]=i;
            this.size[i] =1
            this.rank[i]=0
        }
    }

    print(){
        console.log(this.parent)
        console.log(this.size)
    }

  findUlitmateParent (node){

    if(this.parent[node]==node){
        return node;
    } else {
        this.parent[node] = this.findUlitmateParent(this.parent[node]);
        return this.parent[node];
    }
  }

  unionByRank(u,v){
    const parentOfU = this.findUlitmateParent(u);
    const parentOfV = this.findUlitmateParent(v);

    if(parentOfV ==parentOfU){
        return;
    } else if(this.rank[parentOfU] > this.rank[parentOfV]){
        this.parent[parentOfV] =parentOfU;
    } else if (this.rank[parentOfU] < this.rank[parentOfV]) {
        this.parent[parentOfU] =parentOfV;
    } else {
        this.parent[parentOfV] =parentOfU;
        this.rank[parentOfU]++;
    }

  }

  unionBySize(){
    const parentOfU = this.findUlitmateParent(u);
    const parentOfV = this.findUlitmateParent(v);

    if(parentOfV ==parentOfU){
        return;
    } else if(this.size[parentOfU] > this.size[parentOfV]){
        this.parent[parentOfV] =parentOfU;
        this.size[parentOfU] +=this.size[parentOfV];
    } else if (this.size[parentOfU] < this.size[parentOfV]) {
        this.parent[parentOfU] =parentOfV;
        this.size[parentOfV] +=this.size[parentOfU];
    }
  }
}




function example1() {
    const dsu = new DSU(5);

    dsu.unionByRank(1,2);
    dsu.unionByRank(1,4);
    dsu.unionByRank(3,5);

    let count = 0;

    for(let i=1; i<=5; i++){
        if(dsu.parent[i] ==i){
            count++
        }
    }

    console.log("Number of connected components is", count);

}

example1()

