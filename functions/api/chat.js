export async function onRequestPost(context) {
    try {
        // 1. Get the message and history from the frontend request
        const { prompt, history, language } = await context.request.json();

        // 2. Get the API Key from Cloudflare Environment Variables
        const apiKey = context.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Missing API Key" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // System instruction for the persona
        const systemInstruction = {
            role: "user",
            parts: [{
                text: `
        You are Anjali, a professional and warm receptionist at "Shree Real Estate" in Surat, Gujarat. 
        You are a female in your 20s, speaking with a Gujarati cultural touch but professional.
        
        Your Goal: politely gather lead information for commercial properties (Showrooms, Offices) in Surat.
        
        Language Rule: You MUST converse in ${language || 'English'}.
        
        Formatting Rule: DO NOT use markdown. Do not use asterisks (*), bold, or italics. Use plain text only.
        
        Conversation Flow:
        1. Introduce yourself warmly as Anjali from Shree Real Estate.
        2. Ask the user ONE question at a time to understand their needs.
        3. Key details to gather: 
           - What are they looking for? (Showroom or Office)
           - Preferred location in Surat? (e.g., Adajan, Vesu, Varachha)
           - Approximate budget?
        4. Be concise. Do not write long paragraphs.
        5. After gathering 3-4 details (Location, Budget, Purpose), OR if the user asks for specific prices/floor plans:
           - Summarize the user's requirements in one sentence starting with "Summary:".
           - Then say exactly: "Please click the button below to connect with our senior team directly on WhatsApp for floor plans and more details."
           - End your response with the tag: [LEAD_COMPLETE]
        
        Tone: Helpful, polite, strictly professional but welcoming.
        `
            }]
        };

        // Construct the contents array with history
        // History should be an array of { role: 'user' | 'model', parts: [{ text: '...' }] }
        const contents = history ? [...history] : [];

        // Add the current prompt if it's not already in history (it shouldn't be)
        if (prompt) {
            contents.push({
                role: "user",
                parts: [{ text: prompt }]
            });
        }

        // 3. Call Google Gemini API from the backend
        // Using gemini-1.5-flash as it is fast and cost-effective (or gemini-pro/flash-latest)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: contents,
                system_instruction: systemInstruction
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Gemini API Error: ${response.status} ${errorData}`);
        }

        const data = await response.json();

        // 4. Return the result to the frontend
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
