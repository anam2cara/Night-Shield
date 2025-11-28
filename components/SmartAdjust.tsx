import React, { useState } from 'react';
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FilterMode } from '../App';

interface SmartAdjustProps {
  onUpdateSettings: (mode: FilterMode, intensity: number) => void;
}

export const SmartAdjust: React.FC<SmartAdjustProps> = ({ onUpdateSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSmartSet = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `User context: "${prompt}". Suggest the best screen filter mode ('blue' or 'dim') and intensity (5-90).`,
        config: {
          systemInstruction: "You are an eye health assistant. Based on the user's activity or environment description, determine the best screen filter settings. 'blue' is for blue light reduction (general use, evening). 'dim' is for very dark environments to reduce brightness below 0%. Intensity 5 is light, 90 is extremely strong/dark.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              mode: { type: Type.STRING, enum: ['blue', 'dim'] },
              intensity: { type: Type.INTEGER },
            },
            required: ['mode', 'intensity'],
          } as Schema,
        },
      });

      const result = JSON.parse(response.text || '{}');
      
      if (result.mode && result.intensity) {
        onUpdateSettings(result.mode as FilterMode, result.intensity);
        setIsOpen(false);
        setPrompt('');
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("Gagal menghubungkan ke AI. Pastikan API Key valid.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg text-white font-medium shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <span>✨</span> AI Smart Set
      </button>
    );
  }

  return (
    <div className="bg-[#222] p-4 rounded-lg border border-[#333] w-full animate-fade-in">
      <label className="block text-sm text-gray-300 mb-2">
        Apa aktivitasmu sekarang?
      </label>
      <input 
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Cth: Sakit kepala, atau baca di kasur..."
        className="w-full bg-[#111] border border-[#333] text-white rounded p-2 mb-3 focus:border-orange-500 outline-none text-sm"
        disabled={isLoading}
      />
      <div className="flex gap-2">
        <button 
          onClick={handleSmartSet}
          disabled={isLoading || !prompt.trim()}
          className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 flex justify-center items-center"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : 'Atur Otomatis'}
        </button>
        <button 
          onClick={() => setIsOpen(false)}
          className="px-3 bg-[#333] hover:bg-[#444] text-gray-300 rounded text-sm transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  );
};