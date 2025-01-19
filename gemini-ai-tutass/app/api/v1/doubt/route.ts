import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function POST(request: Request) {
  const { classname, subj, topic, doubt } = await request.json()

  const prompt = `As a knowledgeable tutor for class ${classname}, subject ${subj}, and topic '${topic}', please address the following doubt:

${doubt}

Please provide a clear and concise explanation that is appropriate for a student in class ${classname}.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}

