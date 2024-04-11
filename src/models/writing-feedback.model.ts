export interface WritingFeedback{
     writingId: {
        "_id": string, 
        prompt: string
    }, 
    "_id": string, 
    feedback: [string], 
    improvedVersion: [string], 
    skill: string,
    essay: [string]
}