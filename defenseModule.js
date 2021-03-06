const {TOWER_ATTACK_INTERVAL, MIN_WALL_HEALTH} = require('config');

const defenseModule = (function () {
    const o = {
        getTowers: function (roomName) {
            return Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {
                    filter: {structureType: STRUCTURE_TOWER}
                });
        },
        hasDamagedStructs: function (roomName) {
            return Game.rooms[roomName].find(
                FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                }).length;
        },
        getClosestDamagedStructs: function (tower) {
            return tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    if (structure.structureType === STRUCTURE_WALL) {
                        return structure.hits < MIN_WALL_HEALTH;
                    }
                    return structure.hits < structure.hitsMax;
                }
            });
        },
        doRepair: function (tower, closestDamagedStructure) {
            if (typeof closestDamagedStructure !== 'undefined') {
                if (tower.repair(closestDamagedStructure) === OK) {
                    Memory.lastRepair[tower.id] = Game.time;
                }
            }
        },
        attackThreats: function (tower, targets) {
            const closestThreat = tower.pos.findClosestByRange(targets);
            if (closestThreat) {
                tower.attack(closestThreat);
            }
        }
    };

    const publicAPI = {
        run: function (roomName) {

            if (Memory.lastRepair === undefined) {
                Memory.lastRepair = {};
            }

            const targets = _.filter(Game.rooms[roomName].find(FIND_HOSTILE_CREEPS),
                c => c.owner.username !== 'Source Keeper');

            if (targets.length) {
                Game.rooms[roomName].memory.underAttack = true;
            } else {
                Game.rooms[roomName].memory.underAttack = false;
            }

            let towers;
            if ((towers = o.getTowers(roomName)).length) {
                if (targets.length) {
                    towers.forEach(
                        tower => o.attackThreats(tower, targets));
                } else if (o.hasDamagedStructs(roomName)) {
                    _.forEach(towers, (tower) => {
                        if (Memory.lastRepair[tower.id] === undefined) {
                            Memory.lastRepair[tower.id] = 0;
                        }
                        if (Game.time > (Memory.lastRepair[tower.id] + TOWER_ATTACK_INTERVAL)) {
                            o.doRepair(tower, o.getClosestDamagedStructs(tower));
                        }
                    });
                }
            }


        }
    };

    return publicAPI;
})();

module.exports = defenseModule;
