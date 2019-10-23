/// <reference path="RoomType.ts" />
/// <reference path="Floor.ts" />

class Room {
    containerFloor: Floor;
    type : RoomType;
    exits : [Room, number][];
    blockedSides: string[];
    distanceFromEntrance : number;
    visited: boolean;
    hasPlayer: boolean;
    containedEnemy: Enemy;
    containedTool: Tool;

    constructor(containerFloor: Floor, type: RoomType, entrance? : [Room, number], distanceFromEntrance? : number, hasPlayer? : boolean, containedEnemy? : Enemy, containedTool? : Tool) {
        this.containerFloor = containerFloor;
        this.type = type;
        this.exits = entrance ? [entrance] : [];
        if (entrance) {
            this.distanceFromEntrance = entrance[0].distanceFromEntrance + 1
        } else {
            this.distanceFromEntrance = distanceFromEntrance || 0;
        }
        this.hasPlayer = hasPlayer || false;
        this.visited = false;
        if (containedEnemy) this.containedEnemy = containedEnemy;
        if (containedTool) this.containedTool = containedTool;
        this.blockedSides = [];
    }

    continueFloor(): void {
        UI.fillScreen(UI.renderFloor(this.containerFloor));
    }

    enter(): void {
        for (var i = 0; i < this.containerFloor.rooms.length; i++) {
            for (var j = 0; j < this.containerFloor.rooms[i].length; j++) {
                if (this.containerFloor.rooms[i][j]) this.containerFloor.rooms[i][j].hasPlayer = false;
            }
        }
        this.visited = true;
        this.hasPlayer = true;
        switch(this.type) {
            case RoomType.Enemy:
                if (this.containedEnemy.health != 0) {
                    var f = new Fight(this.containerFloor.currentRun.player, this.containedEnemy, this);
                    break;
                }
            case RoomType.Tool:
                if (this.containedTool != null) {
                    UI.fillScreen(UI.renderToolRoom(this.containedTool, this.containerFloor.currentRun.player, this));
                    break;
                }
            case RoomType.Empty:
            case RoomType.Entrance:
            case RoomType.Exit:
            case RoomType.Tool:
                this.containerFloor.redraw();
                break;
        }
        
    }
}