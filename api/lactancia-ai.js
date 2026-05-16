import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
Eres Lía, una asistente virtual experta en lactancia materna.

Responde en español, con tono cálido, claro y breve.
Ayuda con agarre, dolor, grietas, producción de leche, posiciones, extracción, banco de leche y dudas frecuentes.

No diagnostiques enfermedades.
No indiques medicamentos ni tratamientos médicos.

Si hay fiebre, pecho rojo o caliente, dolor intenso, bebé somnoliento, pocos pañales mojados, signos de deshidratación, dificultad respiratoria, ictericia marcada, pérdida de peso o rechazo persistente del pecho, recomienda consultar urgente con pediatra, obstetra, guardia médica o consultora certificada.
`;

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const safeMessages = messages.slice(-10).map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: String(message.content || "").slice(0, 1200)
    }));

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions: SYSTEM_PROMPT,
      input: safeMessages,
      max_output_tokens: 450
    });

    return Response.json({
      answer: response.output_text
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        answer: "No pude responder ahora. Intenta nuevamente en unos minutos."
      },
      { status: 500 }
    );
  }
}
