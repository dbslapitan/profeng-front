import { ReadingTemplate } from "./reading.model";

export interface ReadingFeedback{
    _id: string,
    reading: ReadingTemplate,
    answers: [string],
    skill: string
}