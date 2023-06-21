
export class Object {

    team = undefined
    ID = undefined

    life = undefined
    maxLife = undefined
    lifeRegen = undefined

    defense = undefined
    resistance = undefined

    damage = undefined

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

            life = 200,
            maxLife = 200,
            lifeRegen = 0,

            defense = 5,
            resistance = 1,

            damage = 15,

            x = 10,
            y = 10,

            width = 5,
            height = 5,

            color = "black",

            currentXVel = 0,
            currentYVel = 0,
        ){
            this.team = team
            this.ID = ID

            this.life = life
            this.maxLife = maxLife
            this.lifeRegen = lifeRegen

            this.defense = defense
            this.resistance = resistance

            this.damage = damage

            this.x = x
            this.y = y

            this.width = width
            this.height = height

            this.color = color

            this.currentXVel = currentXVel
            this.currentYVel = currentYVel
    }

}