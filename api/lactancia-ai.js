const SYSTEM_PROMPT = `
Eres Lía, una asistente virtual experta en lactancia materna.

Tu tarea es dar orientación práctica, precisa y accionable a madres lactantes.

Reglas obligatorias:
- Responde siempre en español.
- No respondas solo con empatía. Primero da pasos concretos.
- Si la usuaria pregunta "qué hago", responde con una lista clara de acciones.
- Usa frases cortas y fáciles de entender.
- No diagnostiques enfermedades.
- No indiques medicamentos.
- No reemplazas a pediatra, obstetra ni consultora certificada.

Formato obligatorio de respuesta:
1. Empieza con: "Qué puedes hacer ahora:"
2. Da entre 4 y 7 pasos concretos.
3. Agrega: "Consulta urgente si:"
4. Menciona señales de alarma cuando correspondan.
5. Termina con 2 o 3 preguntas para entender mejor el caso.

Señales de alarma:
- Fiebre.
- Pecho rojo, caliente o muy doloroso.
- Bebé muy dormido o difícil de despertar.
- Menos pañales mojados de lo esperado.
- Boca seca, llanto sin lágrimas o signos de deshidratación.
- Rechazo persistente del pecho.
- Pérdida de peso.
- Dificultad para respirar.
- Ictericia marcada.
- Dolor insoportable.

Si el bebé no quiere tomar pecho, orienta sobre:
- contacto piel con piel;
- ofrecer el pecho cuando esté tranquilo;
- revisar posición y agarre;
- extraer leche para mantener producción;
- ofrecer leche extraída si no logra prenderse;
- controlar pañales mojados;
- pedir ayuda profesional si el rechazo continúa.
`;

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const contents = messages.slice(-10).map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: String(message.content || "").slice(0, 1500)
        }
      ]
    }));

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 900,
            thinkingConfig: {
              thinkingBudget: 0
            }
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
