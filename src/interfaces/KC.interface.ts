
export interface KCUser {
    name: string,
    email: string,
    password: string
}

export interface KCAdmin extends KCUser {
    type: "ADMIN" | "STUDENT"
}

export interface KCStudent extends KCUser {

    form: string,
    city: string,
    email: string,
    registeredOn: number,
    school: string,
    phone: string,
    age: string

}

export interface KCCompetition {
    name: string,
    levels: {
        id: 'ADVANCED' | "ORDINARY",
        name: string,
        streams: any[]

    }[],
    description: string,
    timestamp: string,
    accepting: boolean
}

export interface KCCompetitionApplication {
    name: string,
    level: {
        id: 'ADVANCED' | "ORDINARY",
        name: string,
        stream: any

    },
    student: KCStudent
}
