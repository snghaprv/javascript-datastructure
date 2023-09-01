class DSU {
  constructor(noOfVertex) {
    this.parent = new Array(noOfVertex + 1);
    this.size = new Array(noOfVertex + 1);
    this.rank = new Array(noOfVertex + 1);

    for (let i = 0; i < this.parent.length; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
      this.rank[i] = 0;
    }
  }

  findUltimateParent(node) {
    if (this.parent[node] == node) {
      return node;
    } else {
      this.parent[node] = this.findUltimateParent(this.parent[node]);
      return this.parent[node];
    }
  }

  unionByRank(u, v) {
    const parentOfU = this.findUltimateParent(u);
    const parentOfV = this.findUltimateParent(v);

    if (parentOfV == parentOfU) {
      return;
    } else if (this.rank[parentOfU] > this.rank[parentOfV]) {
      this.parent[parentOfV] = parentOfU;
    } else if (this.rank[parentOfU] < this.rank[parentOfV]) {
      this.parent[parentOfU] = parentOfV;
    } else {
      this.parent[parentOfV] = parentOfU;
      this.rank[parentOfU]++;
    }
  }

  unionBySize(u, v) {
    const parentOfU = this.findUltimateParent(u);
    const parentOfV = this.findUltimateParent(v);
    if (parentOfV == parentOfU) {
      return;
    } else if (this.size[parentOfU] >= this.size[parentOfV]) {
      this.parent[parentOfV] = parentOfU;
      this.size[parentOfU] += this.size[parentOfV];
    } else if (this.size[parentOfU] < this.size[parentOfV]) {
      this.parent[parentOfU] = parentOfV;
      this.size[parentOfV] += this.size[parentOfU];
    }
  }
}
