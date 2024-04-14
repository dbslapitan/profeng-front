export interface WritingFeedback{
     writing: {
        "_id": string, 
        prompt: string
    }, 
    "_id": string, 
    feedback: [string], 
    improvedVersion: [string], 
    skill: string,
    essay: [string],
    createdAt: number,
    status: string
}