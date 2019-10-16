/// <reference path="Room.ts" />
/// <reference path="RoomType.ts" />
/// <reference path="../UI.ts" />
/// <reference path="../floors.ts" />

class Floor {
    width: number;
    height: number;

    roomCount: number;
    rooms: Array<Array<Room>>;

    div : HTMLElement;

    currentRun : Run;

    constructor(level: number, currentRun: Run) {
        this.currentRun = currentRun
        var floorSettings = floors[level];
        this.width = floorSettings.width;
        this.height = floorSettings.height;

        this.roomCount = Math.floor(Math.random() * (1 + floorSettings.maxRooms - floorSettings.minRooms)) + floorSettings.minRooms;
        
        var roomWeights = floorSettings.roomWeights;
        var roomWeightTotal = 0;        
        
        for (var i = 0; i < roomWeights.length; i++) {
            roomWeightTotal += roomWeights[i].weight;
        }
        for (var i = 0; i < roomWeights.length; i++) {
            roomWeights[i].weight /= roomWeightTotal;
        }

        var floorEnemies = floorSettings.enemies;
        var enemyWeightTotal = 0;

        for (var i = 0; i < floorEnemies.length; i++) {
            enemyWeightTotal += floorEnemies[i].weight;
        }
        for (var i = 0; i < floorEnemies.length; i++) {
            floorEnemies[i].weight /= enemyWeightTotal;
        }

        var floorTools = floorSettings.tools;
        var toolWeightTotal = 0;

        for (var i = 0; i < floorTools.length; i++) {
            toolWeightTotal += floorTools[i].weight;
        }
        for (var i = 0; i < floorTools.length; i++) {
            floorTools[i].weight /= toolWeightTotal;
        }

        this.rooms = new Array<Array<Room>>(this.height);
        for (var i = 0; i < this.rooms.length; i++) {
            this.rooms[i] = new Array<Room>(this.width);
        }

        var entranceRoom = new Room(this, RoomType.Entrance);
        entranceRoom.hasPlayer = true;
        entranceRoom.visited = true;
        this.rooms[Math.floor(Math.random() * this.height)][Math.floor(Math.random() * this.width)] = entranceRoom;
        for (var i = 0; i < this.roomCount - 1 ; i++) {
            var roomIndex;
            var newRoomIndex;
            var maxRoomDistance = 0;
            while (true) {
                roomIndex = [Math.floor(Math.random() * this.height), Math.floor(Math.random() * this.width)];
                if (this.rooms[roomIndex[0]][roomIndex[1]] != undefined) {
                    var branchDirection = Math.floor(Math.random() * 4);
                    var newRoomOffset;
                    switch(branchDirection) {
                        case 0:
                            newRoomOffset = [1,0];
                            break;
                        case 1:
                            newRoomOffset = [0,1];
                            break;
                        case 2:
                            newRoomOffset = [-1,0];
                            break;
                        case 3:
                            newRoomOffset = [0,-1];
                            break;
                    }
                    newRoomIndex = [roomIndex[0] + newRoomOffset[0], roomIndex[1] + newRoomOffset[1]];
                    if (newRoomIndex[0] > -1 && newRoomIndex[0] < this.height && newRoomIndex[1] > -1 && newRoomIndex[1] < this.width && this.rooms[newRoomIndex[0]][newRoomIndex[1]] == undefined) break;
                }
            }
            var roomType;
            var roomRand = Math.random();
            console.log(roomWeights);
            for (var j = 0; j < roomWeights.length; j++) {
                roomRand -= roomWeights[j].weight;
                if (roomRand < 0) {
                    roomType = roomWeights[j].name;
                    console.log(roomType);
                    break;
                }
            }
            var newRoom;
            if (roomType == RoomType.Enemy) {
                var enemyRand = Math.random();
                for (var j = 0; j < floorEnemies.length; j++) {
                    enemyRand -= floorEnemies[j].weight;
                    if (enemyRand < 0) {
                        newRoom = new Room(this, roomType, this.rooms[roomIndex[0]][roomIndex[1]], 0, false, enemies.get(floorEnemies[j].name));
                        break;
                    }
                }
            } else if (roomType == RoomType.Tool) {
                var toolRand = Math.random();
                for (var j = 0; j < floorTools.length; j++) {
                    toolRand -= floorTools[j].weight;
                    if (toolRand < 0) {
                        newRoom = new Room(this, roomType, this.rooms[roomIndex[0]][roomIndex[1]], 0, false, null, tools.get(floorTools[j].name));
                        break;
                    }
                }
            } else newRoom = new Room(this, roomType, this.rooms[roomIndex[0]][roomIndex[1]]);
            this.rooms[newRoomIndex[0]][newRoomIndex[1]] = newRoom;
            this.rooms[roomIndex[0]][roomIndex[1]].exits.push(newRoom);
            maxRoomDistance = Math.max(maxRoomDistance, newRoom.distanceFromEntrance);
        }
        var minExitDistance = Math.ceil(maxRoomDistance * 3.0 / 4);
        var potentialExits = [];
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                if (this.rooms[i][j] && this.rooms[i][j].distanceFromEntrance >= minExitDistance) {
                    potentialExits.push(this.rooms[i][j]);
                }
            }
        }
        var exitRoom = potentialExits[Math.floor(Math.random() * potentialExits.length)];
        exitRoom.type = RoomType.Exit;
        console.log(this);
    }

    draw(): void {
        this.div = UI.makeDiv('map');
        document.body.appendChild(this.div);
        this.redraw();
    }
    
    redraw(): void {
        document.body.innerHTML = '';
        document.body.appendChild(UI.renderFloor(this));
    }
    
    end(): void {
        document.body.removeChild(this.div);
    }
}