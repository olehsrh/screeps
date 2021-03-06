##Screeps

Version: _0.2.12_
-------
###Changelog for v0.2.12

- Added squads. Squads can be controlled with flags.
- Added auto-scaling creeps with levels.
- Disabled auto-positioning of the structures.
- Containers for miners have to be built manually as well.
- Miners now will only look for containers in range 1 to sources.
- Fixed bug resulting in miner not being built properly.
- Fixed auto-scaling not working properly.
- Fixed bug resulting in wrong resolving source id.
- Fixed calculating of needed transporters and couriers.
- Fixed minor bugs regarding builders and transporters and couriers.
- Fixed towers only repairing if room is under attack.
- When controller level is max, upgraders will only upgrade it when its ticksToDowngrade is 1/2 of max available.
- Towers won't repair walls with hits more than defined in config.
- Fixed performance issues caused by creep behaviour
- Additional minor bug fixes
- Fix builders harvesting only 1 source
- Transporters will first search for storages to fill up.
- Disabled auto-spawning military creeps when enemy is detected in the room.

-------
#####Flags to control squads

Squads can be controlled by flags. 
Each squad is identified by the first color of a spawn flag. If multiple spawn flags with the same main color were spawned, they will be considered as a one squad unit.
The second flag color defines an action to be taken by a specific squad, which is identified by the main color of this flag.
There are currently supported only 4 actions: SPAWN, MOVE_TO, ATTACK, RETREAT.

| Main color      | Secondary color  | Description |
|:-----------|:----------:|:------------:|
| squad color     | COLOR_YELLOW| Spawn and command this squad to locate near the flag|
| squad color      | COLOR_GREEN| Command this squad to locate near the flag|
| squad color      | COLOR_RED  | Make this squad attack the position where the secondary flag is placed |
| squad color      | COLOR_WHITE| Make this squad retreat to the first spawn in Game.spawns(not to position of the retreat flag) |

-------
#####Auto-scaling creeps

Parts are added depending on the amount of energy in the room.

| Creep role      | Description |
|:-----------|:------------|
| Miner     | Can contain from 5 to 11 parts. Max 6 W, 1 C and 4 M|
| Courier or Transporter     | Can contain from 4 to 49 parts. Starting with 2 M and 2 C further added 2 C and 1 M up to 49 parts|
| Military creeps      | Can contain from 2 to 50 parts. Starting with 1 M and 1 A\R\H further added 1 M and 1 A\R\H up to 50 parts |
