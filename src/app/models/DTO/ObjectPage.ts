export class ObjectPage {
    objectList: any[] = [];
    sizeList: number = 0;

    constructor(objectList: any[], sizeList: number) {
        this.objectList = objectList;
        this.sizeList = sizeList;
    }
}