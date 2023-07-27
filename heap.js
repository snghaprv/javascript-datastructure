class Heap {
    constructor(callback) {
        this.values = [];
        this.callback = callback
    }
    size() {
        return this.values.length
    }
    parent(index) {
        return Math.floor((index - 1) / 2);
    }
    leftChild(index) {
        return (index * 2) + 1;
    }
    rightChild(index) {
        return (index * 2) + 2;
    }
    isLeaf(index) {
        return (
            index >= Math.floor(this.values.length / 2) && index <= this.values.length - 1
        )
    }
    swap(index1, index2) {
        [this.values[index1], this.values[index2]] = [this.values[index2], this.values[index1]];
    }


    heapifyDown(index) {
        if (!this.isLeaf(index)) {

            let leftChildIndex = this.leftChild(index),
                rightChildIndex = this.rightChild(index),
                largestIndex = index;

            if (this.callback(this.values[leftChildIndex],this.values[largestIndex])) {
                largestIndex = leftChildIndex;
            }
            if (rightChildIndex <this.values.length && this.callback(this.values[rightChildIndex], this.values[largestIndex])) {
                largestIndex = rightChildIndex;
            }

            if (largestIndex !== index) {
                this.swap(index, largestIndex);
                this.heapifyDown(largestIndex);
            }
        }
    }

    heapifyUp(index) {
        let currentIndex = index,
            parentIndex = this.parent(currentIndex);
        while (currentIndex > 0 && this.callback(this.values[currentIndex] , this.values[parentIndex])) {
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = this.parent(parentIndex);
        }
    }

    add(element) {
        this.values.push(element);
        this.heapifyUp(this.values.length - 1);
    }
    peek() {
        return this.values[0];
    }
    extract() {
        if (this.values.length < 1) return 'heap is empty';
        if(this.values.length ==1){
            const max = this.values[0];
            this.values =[]
            return max;
        }
        const max = this.values[0];
        const end = this.values.pop();
        this.values[0] = end;
        this.heapifyDown(0);
        return max;
    }

    buildHeap(array) {
        this.values = array;
        for(let i = Math.floor(this.values.length / 2); i >= 0; i--){
            this.heapifyDown(i);
        }
    }

    print() {
        let i = 0;
        while (!this.isLeaf(i)) {
            console.log("PARENT:", this.values[i]);
            console.log("LEFT CHILD:", this.values[this.leftChild(i)]);
            console.log("RIGHT CHILD:", this.values[this.rightChild(i)]);
            i++;
        }      
    }
}



// MinHeap
// const heap = new Heap((a,b) => b > a);

// MaxHeap
// const heap = new Heap((a,b) => a> b);
