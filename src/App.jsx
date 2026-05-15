import React, { useState } from 'react';
import { 
  Heart, CheckCircle2, Droplets, Clock, ChevronDown, 
  ChevronUp, Star, ShoppingBag, ArrowRight, Download,
  ShieldCheck, Smartphone, Users, Quote, Info, XCircle, Sparkles,
  MessageCircle, Send, Loader2, Bot, X
} from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-rose-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-rose-600 transition-colors group"
      >
        <span className="font-bold text-slate-700 text-lg group-hover:text-rose-600 transition-colors pr-8">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-rose-400 flex-shrink-0" /> : <ChevronDown size={20} className="text-rose-400 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-slate-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const LactanciaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hola, soy Lía, tu asistente virtual de lactancia. Puedo ayudarte con agarre, dolor, producción, posiciones, extracción y dudas frecuentes. Cuéntame qué está pasando."
    }
  ]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/lactancia-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });

      const data = await response.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.answer || "Perdón, no pude responder en este momento."
        }
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Hubo un problema al conectar con la IA. Intenta nuevamente en unos segundos."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] bg-rose-500 text-white h-16 w-16 rounded-full shadow-2xl shadow-rose-200 flex items-center justify-center hover:bg-rose-600 transition-all"
        aria-label="Abrir chat de lactancia"
      >
        <MessageCircle size={28} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-[70] w-[calc(100vw-2rem)] max-w-md bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
          <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-rose-500 h-10 w-10 rounded-full flex items-center justify-center">
                <Bot size={22} />
              </div>
              <div>
                <p className="font-black leading-tight">Lía IA</p>
                <p className="text-xs text-slate-300">Experta virtual en lactancia</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={22} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-5 space-y-4 bg-rose-50/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-rose-500 text-white"
                      : "bg-white text-slate-700 border border-rose-100"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="bg-white border border-rose-100 rounded-2xl px-4 py-3 text-sm text-slate-500 inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Escribiendo...
              </div>
            )}
          </div>

          <div className="p-4 border-t border-rose-100 bg-white">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-slate-50 border border-rose-100 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-200"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-rose-500 text-white h-12 w-12 rounded-2xl flex items-center justify-center hover:bg-rose-600 disabled:opacity-60 transition-colors"
                aria-label="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
              Orientación educativa. No reemplaza una consulta con pediatra, obstetra o consultora certificada.
            </p>
          </div>
        </div>
      )}
    </>
  );
};



export default function App() {
  const HOTMART_LINK = "https://pay.hotmart.com/S105827106G"; // 

  return (
    <div className="min-h-screen bg-white selection:bg-rose-100 selection:text-rose-900 font-sans">
      
      {/* Barra de Notificación Superior (Urregecia) */}
      <div className="bg-slate-900 text-white py-2.5 px-4 text-center text-xs md:text-sm font-bold tracking-wide">
        ✨ OFERTA ESPECIAL: 60% DE DESCUENTO SOLO POR LAS PRÓXIMAS 24 HORAS
      </div>

      {/* Navegación Minimalista */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-rose-500" fill="currentColor" size={24} />
            <span className="font-black text-xl tracking-tighter text-slate-800">MamiGuía</span>
          </div>
          <a href="#precio" className="bg-rose-500 text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-rose-600 transition-all shadow-md">
            COMPRAR AHORA
          </a>
        </div>
      </nav>

      {/* --- SECCIÓN 1: HERO (Atención) --- */}
      <header className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-rose-50/30">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 bg-rose-100 px-3 py-1.5 rounded-full text-rose-600 font-bold text-xs uppercase tracking-widest">
              <Users size={14} /> <span>+2,500 mamás ayudadas este mes</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Amamanta con <span className="text-rose-500">seguridad</span>, sin dolor y disfrutando el proceso.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Descubre el método paso a paso para lograr un agarre perfecto, aumentar tu producción y conectar profundamente con tu bebé desde el primer día.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a href="#precio" className="bg-rose-500 text-white font-black py-5 px-10 rounded-2xl shadow-xl shadow-rose-200 hover:bg-rose-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg">
                SÍ, QUIERO LA GUÍA AHORA <ArrowRight size={20} />
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4 text-slate-400 text-sm">
              <div className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-500"/> Pago Seguro</div>
              <div className="flex items-center gap-1"><Download size={16} className="text-rose-400"/> Acceso Inmediato</div>
            </div>
          </div>

          {/* Ilustración/Imagen contenida y profesional */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-[4/5] bg-rose-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform lg:rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop" 
                alt="Madre e hijo conexión" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl">
                 <div className="flex items-center gap-2 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#f59e0b" className="text-amber-500"/>)}
                 </div>
                 <p className="text-slate-800 text-xs font-bold leading-tight">"Pasé de llorar por el dolor a amar este momento. ¡Gracias!"</p>
                 <p className="text-rose-500 text-[10px] font-black uppercase mt-1">— Lucía, mamá de Mateo</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SECCIÓN 2: AGITACIÓN DEL DOLOR (Interés) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              ¿Sientes que la lactancia es una <span className="text-rose-500">lucha constante</span> en lugar de un regalo?
            </h2>
            <p className="text-slate-500 text-lg font-medium">Sabemos que el cansancio y las dudas pueden nublar este momento tan especial.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {[
              "¿Te duele cada vez que tu bebé se engancha?",
              "¿Dudas constantemente si está tomando suficiente leche?",
              "¿Las grietas y molestias te hacen querer rendirte?",
              "¿Te sientes abrumada por consejos contradictorios?"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
                <XCircle className="text-rose-400 flex-shrink-0" size={24} />
                <p className="text-slate-700 font-bold leading-tight">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-slate-900 rounded-[2.5rem] text-white text-center">
             <p className="text-xl md:text-2xl font-medium leading-relaxed italic">
               "No tienes que pasar por esto sola. La lactancia no debería doler, y con la información correcta, puedes transformar tu experiencia hoy mismo."
             </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: LA SOLUCIÓN (Deseo) --- */}
      <section className="py-24 bg-rose-50/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Todo lo que necesitas para una <span className="text-rose-500">lactancia exitosa</span> en un solo lugar.
              </h2>
              <div className="space-y-8">
                {[
                  { icon: <Droplets />, title: "Técnica de Agarre Profundo", desc: "Instrucciones visuales paso a paso para eliminar el dolor desde la primera toma." },
                  { icon: <Clock />, title: "Señales de Hambre Reales", desc: "Aprende a leer a tu bebé antes de que el llanto aparezca." },
                  { icon: <Smartphone />, title: "Banco de Leche Sin Estrés", desc: "Cómo prepararte para el regreso al trabajo o tener tiempo para ti." },
                  { icon: <ShieldCheck />, title: "Mitos vs. Realidad", desc: "Información basada en ciencia para ignorar los consejos que solo te confunden." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="bg-white p-3 rounded-2xl text-rose-500 shadow-sm border border-rose-100 flex-shrink-0 h-fit">
                      {React.cloneElement(item.icon, { size: 28 })}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-rose-100">
                <div className="space-y-6">
                  <div className="bg-rose-500 h-2 w-20 rounded-full"></div>
                  <h3 className="text-3xl font-black text-slate-900">¿Qué incluye la Guía?</h3>
                  <ul className="space-y-4">
                    {["PDF interactivo de 50+ páginas", "Guía rápida de posiciones", "Checklist de señales de alerta","Actualizaciones gratuitas"].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                        <CheckCircle2 className="text-green-500" size={20} /> {text}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">BONO EXCLUSIVO</p>
                      <p className="text-slate-800 font-bold">Calendario de brotes de crecimiento para que nada te tome por sorpresa.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 4: OFERTA FINAL (Acción) --- */}
      <section id="precio" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative">
            {/* Decoración fondo */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShoppingBag size={150} />
            </div>

            <div className="p-10 md:p-20 text-center text-white relative z-10">
              <span className="bg-rose-500 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 inline-block">
                OFERTA POR TIEMPO LIMITADO
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Guía Lactancia en Calma</h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto">
                Únete a miles de mamás que ya transformaron su maternidad. Pago único, acceso para siempre.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                <div className="text-left">
                  <p className="text-slate-500 line-through text-2xl font-bold">$40.00</p>
                  <p className="text-6xl md:text-7xl font-black text-rose-500">$15,00</p>
                </div>
                <div className="h-12 w-[1px] bg-slate-800 hidden md:block"></div>
                <div className="text-left max-w-[200px]">
                  <p className="text-sm font-bold text-slate-300">Ahorras más del 60% hoy mismo.</p>
                </div>
              </div>

              <a href={HOTMART_LINK} className="block w-full bg-rose-500 text-white font-black py-6 rounded-3xl text-2xl hover:bg-rose-600 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                OBTENER MI GUÍA AHORA
              </a>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                  <ShieldCheck className="text-green-500" size={18}/> 100% Seguro
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                  <Star className="text-amber-500" fill="currentColor" size={18}/> 7 Días de Garantía
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                  <Users className="text-rose-500" size={18}/> +2.5k Ventas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 5: FAQ --- */}
      <section className="py-24 bg-white border-t border-rose-50">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-black text-slate-900 mb-12 text-center tracking-tight">Preguntas del corazón</h3>
          <div className="divide-y divide-rose-100">
            <FAQItem 
              question="¿Cómo recibo mi guía?" 
              answer="Inmediatamente después de tu pago, Hotmart te enviará un correo con tus datos de acceso. Podrás descargar el PDF y guardarlo en todos tus dispositivos." 
            />
            <FAQItem 
              question="¿Qué pasa si no me sirve?" 
              answer="Confiamos tanto en nuestra guía que te damos 7 días de garantía. Si sientes que no es para ti, nos escribes y te devolvemos el 100% de tu dinero." 
            />
            <FAQItem 
              question="¿Es útil si mi bebé ya tiene unos meses?" 
              answer="¡Claro! La guía cubre desde el primer día hasta el destete, incluyendo brotes de crecimiento y banco de leche que suelen necesitarse más adelante." 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-16 px-6 border-t border-rose-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2 opacity-60">
            <Heart className="text-rose-500" fill="currentColor" size={20} />
            <span className="font-black text-slate-800 tracking-tighter uppercase">MamiGuía</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2024 MamiGuía. Amando y acompañando cada paso.</p>
        </div>
      </footer>
      <LactanciaAI />
    </div>
  );
}
