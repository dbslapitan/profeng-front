export interface ReadingTemplate{
   _id: string, 
   title: string,
   content: [string], 
   questions: [{
    question: string,
    options: [string]
   }]
}