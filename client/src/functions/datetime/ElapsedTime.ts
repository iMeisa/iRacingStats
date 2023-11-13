const Millisecond = 1
const Second = Millisecond * 1000
const Minute = Second * 60
const Hour = Minute * 60
// const Day = Hour * 24

export default function ElapsedTime(time: number): string {

    const hours = Math.floor(time / Hour)
    time = time - (hours * Hour)

    const minutes = Math.floor(time / Minute)

    return `${hours}h ${minutes}m`
}
