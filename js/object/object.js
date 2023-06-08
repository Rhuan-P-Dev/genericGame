
export class Object {

    team = undefined
    ID = undefined
    x = undefined
    y = undefined
    width = undefined
    height = undefined
    color = undefined
    currentXVel = undefined
    currentYVel = undefined

    constructor(
            team = "newTeam",
            ID = "newID",
            x = 10,
            y = 10,
            width = 5,
            height = 5,
            color = "black",
            currentXVel = 0,
            currentYVel = 0
        ){
            this.team = team
            this.ID = ID
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.color = color
            this.currentXVel = currentXVel
            this.currentYVel = currentYVel
    }

}