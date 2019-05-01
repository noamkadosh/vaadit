export class LinkedList {
  private root: Node;
  private length = 0;

  constructor(node: Node) {
    this.root = node;
    this.length++;
  }

  push(node: Node) {
    node.setNext(this.root);
    this.root = node;
    this.length++;
  }

  delete(node: Node) {
    const temp = node.getNext();
    node.setData(node.getNext().getData());
    node.setNext(temp.getNext());
  }
}

export class Node {
  private next: Node;
  private data: any;
  private index: number;

  constructor(data: any) {
    this.data = data;
  }

  getNext() {
    return this.next;
  }

  setNext(next: any) {
    this.next = next;
  }

  getData() {
    return this.data;
  }

  setData(data: any) {
    this.data = data;
  }

  getIndex() {
    return this.index;
  }

  setIndex(index: number) {
    this.index = index;
  }
}
