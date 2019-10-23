/// <reference path="Room.ts" />
/// <reference path="RoomType.ts" />
/// <reference path="../Arrays.ts" />
/// <reference path="../UI.ts" />
/// <reference path="../floors.ts" />
/// <reference path="../Random.ts" />

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

        this.roomCount = Random.intBetween(floorSettings.minRooms, floorSettings.minRooms + 1);
        
        var roomWeights = floorSettings.roomWeights.map(obj => <[string, number]> [obj.name, obj.weight]);  
        var floorEnemies = floorSettings.enemies.map(obj => <[string, number]> [obj.name, obj.weight]);
        var floorTools = floorSettings.tools.map(obj => <[string, number]> [obj.name, obj.weight]);

        this.rooms = new Array<Array<Room>>(this.height);
        for (var i = 0; i < this.rooms.length; i++) {
            this.rooms[i] = new Array<Room>(this.width);
        }

        var entranceRoom = new Room(this, RoomType.Entrance);
        entranceRoom.hasPlayer = true;
        entranceRoom.visited = true;
        this.rooms[Random.intLessThan(this.height)][Random.intLessThan(this.width)] = entranceRoom;
        for (var i = 0; i < this.roomCount - 1 ; i++) {
            var roomIndex;
            var newRoomIndex;
            var maxRoomDistance = 0;
            var branchDirection;
            while (true) {
                roomIndex = Random.intCoord(this.height, this.width);
                branchDirection = Random.intLessThan(4);
                if (this.rooms[roomIndex[0]][roomIndex[1]] != undefined) {
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
            var roomType = Random.weightedRandom(roomWeights);
            var newRoom;
            if (roomType == RoomType.Enemy) {
                newRoom = new Room(this, <RoomType> roomType, [this.rooms[roomIndex[0]][roomIndex[1]], (branchDirection + 2) % 4], 0, false, enemies.get(Random.weightedRandom(floorEnemies)));
            } else if (roomType = RoomType.Tool) {
                newRoom = new Room(this, <RoomType> roomType, [this.rooms[roomIndex[0]][roomIndex[1]], (branchDirection + 2) % 4], 0, false, null, tools.get(Random.weightedRandom(floorTools)));
            } else {
                newRoom = new Room(this, <RoomType> roomType, [this.rooms[roomIndex[0]][roomIndex[1]], (branchDirection + 2) % 4]);
            }
            this.rooms[newRoomIndex[0]][newRoomIndex[1]] = newRoom;
            this.rooms[roomIndex[0]][roomIndex[1]].exits.push([newRoom, branchDirection]);
            maxRoomDistance = Math.max(maxRoomDistance, newRoom.distanceFromEntrance);
        }
        var minExitDistance = Math.ceil(maxRoomDistance * 3.0 / 4);
        var potentialExits = Arrays.flatten(this.rooms).filter(x => x.distanceFromEntrance >= minExitDistance);
        var exitRoom = Random.fromArray(potentialExits);
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