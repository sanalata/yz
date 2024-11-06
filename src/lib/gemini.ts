import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const SYSTEM_PROMPT = `DigiKoç olarak görevin:

- Öğrencilere akademik başarılarını artırmada yardımcı olmak
- LGS sınavına hazırlık sürecinde rehberlik etmek
- Ders çalışma teknikleri ve motivasyon konusunda destek vermek
- Öğrencinin sorularına net ve anlaşılır cevaplar vermek
- Konuları örneklerle açıklamak
- Sınav stratejileri sunmak

İletişim Kuralları:
- Kendini sadece ilk mesajda "DigiKoç" olarak tanıt
- Doğal ve samimi bir dil kullan
- Öğrencinin adını hatırla ve kullan
- Konudan sapmadan net cevaplar ver
- Her cevabında eğitsel değer kat
- Türkçe yanıt ver

Örnek İlk Mesaj:
"Merhaba Ahmet! Ben DigiKoç. Bugün sana nasıl yardımcı olabilirim?"

Örnek Devam Mesajları:
"Matematik konusunda haklısın Ahmet. İsterseniz üslü sayıları adım adım çalışalım."
"Bu soru tipinde dikkat etmen gereken noktaları sıralayalım..."
"Deneme sınavı sonuçlarını birlikte değerlendirelim..."`;

export const getGeminiResponse = async (prompt: string, context?: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const fullPrompt = `${SYSTEM_PROMPT}\n\nGeçmiş: ${context || ''}\n\nÖğrenci: ${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API hatası:', error);
    throw error;
  }
};