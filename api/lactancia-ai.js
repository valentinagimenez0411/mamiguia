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

    const conversation = messages
      .slice(-10)
      .map((message) => {
        const role = message.role === "assistant" ? "Asistente" : "Usuaria";
        const content = String(message.content || "").slice(0, 1200);
        return `${role}: ${content}`;
      })
      .join("\n\n");

    const prompt = `${SYSTEM_PROMPT}

Conversación:
${conversation}

Responde como Lía, con ayuda concreta y empática.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 450
          }
        })
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error(data);
      throw new Error(data?.error?.message || "Gemini API error");
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim() || "No pude generar una respuesta ahora.";

    return Response.json({ answer });
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
