export interface FractalUserInfromation {
    emails: { address: string }[]
    phones: string[]
    uid: string
    verification_cases: {
        created_at: string
        credential: string
        id: string
        journey_completed: boolean
        level: string
        status: string
        updated_at: string
    }[]
}
