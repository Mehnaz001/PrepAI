import {generateText} from 'ai';
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';

export async function GET() {
    return Response.json({succes:true, message: "Thank you!"}, {status:200})
}

export async function POST(request: Request) {
    const {type, role, level, techstack, amount, userId} = await request.json();

    try{
        const {text} = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `You are an AI that generates interview questions.

                    The job role is: ${role}.
                    The job experience level is: ${level}.
                    The tech stack for the job is: ${techstack}.
                    The focus of the questions (behavioral vs technical) should lean towards: ${type}.
                    The total number of questions required is: ${amount}.

                    Instructions:
                - Return only the questions, nothing else.
                - Format the output strictly as a valid JSON array of strings.
                - Each string should be a single interview question.
                - Do not include special characters like "/", "*", or markdown.
                - Do not add explanations, introductions, or closing remarks.

                Example output format:
                ["Question 1", "Question 2", "Question 3"] `,
        })

        const questions: string[] = JSON.parse(text);

        const interview = {
            role, type, level ,
            techstack: techstack.split(','),
            questions: questions,
            userId: userId,
            finalized: true,
            coverImage : getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        }

        await db.collection("interviews").add(interview);

        return Response.json({success:true}, {status:200})
    }
    catch(error) {
        return Response.json({success:false, message:error}, {status: 500});
    }
}